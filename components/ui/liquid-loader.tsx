"use client";

import React, { useState, useEffect } from 'react';

const LiquidLoading = () => {
  const [heights, setHeights] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [droplets, setDroplets] = useState([false, false, false, false, false, false, false]);

  const colors = [
    'from-cyan-400 to-cyan-500',
    'from-cyan-500 to-blue-400',
    'from-blue-400 to-blue-500',
    'from-blue-500 to-emerald-400',
    'from-emerald-400 to-emerald-500',
    'from-emerald-500 to-blue-500',
    'from-blue-500 to-cyan-500'
  ];

  useEffect(() => {
    let animationFrameId: number;
    let lastUpdate = 0;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      // Throttle to ~30fps to reduce re-renders (was 60fps with 2 state updates each)
      if (now - lastUpdate >= 33) {
        lastUpdate = now;
        const currentTime = (now - startTime) * 0.003;

        setHeights(prev => prev.map((_, index) => {
          const maxHeight = 80;
          const delay = index * 0.5;
          const primaryWave = Math.sin(currentTime * 2 + delay);
          const bounceWave = Math.sin(currentTime * 6 + delay) * 0.1;
          return maxHeight * (primaryWave + bounceWave);
        }));

        setDroplets(prev => prev.map((_, index) => {
          const delay = index * 0.5;
          return Math.sin(currentTime * 2 + delay) > 0.7;
        }));
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="flex items-end space-x-4 p-8">
      {heights.map((height, index) => (
        <div key={index} className="relative flex flex-col items-center">
          {/* Droplet - simplified for performance */}
          <div 
            className={`w-4 h-4 rounded-full bg-gradient-to-r ${colors[index]} mb-3 transition-opacity duration-300 ${
              droplets[index] ? 'opacity-100' : 'opacity-0'
            }`}
          />
          
          {/* Main liquid bar - optimized for performance */}
          <div
            className={`w-10 bg-gradient-to-t ${colors[index]} rounded-full transition-all duration-100 ease-out relative overflow-hidden`}
            style={{ 
              height: `${Math.abs(height)}px`,
              transform: height < 0 ? 'scaleY(-1)' : 'scaleY(1)',
              transformOrigin: 'bottom',
            }}
          >
            {/* Simplified shimmer effect */}
            <div 
              className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white/30 to-transparent rounded-full"
            />
          </div>
          
          {/* Base droplet - simplified */}
          <div 
            className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors[index]} mt-2 opacity-70`}
          />
        </div>
      ))}
    </div>
  );
};

export default LiquidLoading;

