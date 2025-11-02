"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface LoadingProps {
  isLoading: boolean;
  onComplete?: () => void;
}

const Loading = ({ isLoading, onComplete }: LoadingProps) => {
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    if (!isLoading && showLoader) {
      // Add a small delay before hiding to ensure smooth transition
      const timer = setTimeout(() => {
        setShowLoader(false);
        onComplete?.();
      }, 500);
      return () => clearTimeout(timer);
    } else if (isLoading) {
      setShowLoader(true);
    }
  }, [isLoading, showLoader, onComplete]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900" />
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-24 -right-24 h-80 w-80 bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/10 to-cyan-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-24 -left-24 h-80 w-80 bg-gradient-to-tr from-emerald-400/20 via-sky-400/10 to-purple-400/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo with Scale/Pulse Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  filter: [
                    "drop-shadow(0 0 0px rgba(99, 102, 241, 0))",
                    "drop-shadow(0 0 20px rgba(99, 102, 241, 0.3))",
                    "drop-shadow(0 0 0px rgba(99, 102, 241, 0))"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image 
                  src="https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762117640/log_ctyaz9.png" 
                  alt="Logo" 
                  width={80}
                  height={80}
                  className="h-20 w-auto object-contain"
                />
              </motion.div>
              
              {/* Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-indigo-400/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Animated Spinner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              {/* Outer Ring */}
              <motion.div
                className="w-12 h-12 border-4 border-neutral-200 dark:border-neutral-700 border-t-indigo-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Inner Ring */}
              <motion.div
                className="absolute inset-1 w-10 h-10 border-2 border-transparent border-t-purple-500 rounded-full"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <motion.p
                className="text-sm text-neutral-500 dark:text-neutral-400 font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Loading...
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
