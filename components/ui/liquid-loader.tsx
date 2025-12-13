"use client";

import React, { useState, useEffect } from 'react';

const LiquidLoading = () => {
  const [heights, setHeights] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [droplets, setDroplets] = useState([false, false, false, false, false, false, false]);

  const colors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-purple-500', 
    'from-cyan-400 to-blue-500',
    'from-green-400 to-cyan-400',
    'from-yellow-400 to-green-400',
    'from-orange-400 to-yellow-400',
    'from-red-500 to-orange-400'
  ];

  useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now();
    
    const animate = () => {
      const currentTime = (Date.now() - startTime) * 0.003; // Faster speed multiplier
      
      setHeights(prev => prev.map((height, index) => {
        const maxHeight = 80;
        const delay = index * 0.5; // Reduced delay for faster wave propagation
        const time = currentTime;
        
        // Simplified wave calculation for better performance
        const primaryWave = Math.sin(time * 2 + delay); // Faster animation
        const bounceWave = Math.sin(time * 6 + delay) * 0.1; // Simplified secondary wave
        
        // Combine waves
        const combinedWave = primaryWave + bounceWave;
        
        return maxHeight * combinedWave;
      }));
      
      // Animate droplets
      setDroplets(prev => prev.map((_, index) => {
        const delay = index * 0.5;
        const time = currentTime;
        const waveValue = Math.sin(time * 2 + delay);
        return waveValue > 0.7;
      }));
      
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

