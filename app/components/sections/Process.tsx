"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Users, Palette, Timer, ArrowRight, Sparkles } from "lucide-react";

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform values for each step
  const step0Y = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const step1Y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const step2Y = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const steps = [{
    icon: <Users className="w-6 h-6"/>,
    title: "1) Discover",
    body: "We align on goals, audience, and success metrics.",
    color: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
    direction: "fade-up"
  }, {
    icon: <Palette className="w-6 h-6"/>,
    title: "2) Design",
    body: "Low‑fi wireframes to polished UI and interactions.",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
    direction: "fade-left"
  }, {
    icon: <Timer className="w-6 h-6"/>,
    title: "3) Build & Ship",
    body: "Iterative development with weekly previews and QA.",
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
    direction: "fade-right"
  }];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const getStepVariants = (direction: string) => ({
    hidden: {
      opacity: 0,
      y: direction === "fade-up" ? 60 : direction === "fade-left" ? 0 : 0,
      x: direction === "fade-left" ? -60 : direction === "fade-right" ? 60 : 0,
      rotateX: 15,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 100
      }
    }
  });

  return (
    <section ref={ref} id="process" className="w-full py-24 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-amber-50/30 to-yellow-50/40 dark:from-orange-950/15 dark:via-amber-950/10 dark:to-yellow-950/15 -z-10" />
      
      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-2xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Content container - centered with max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="relative inline-block">
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-60"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-60"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                Our Process
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="text-neutral-600 dark:text-neutral-300 mt-6 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Transparent, collaborative, and fast. We bring your vision to life through 
              our proven methodology and creative excellence.
            </motion.p>
          </div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={getStepVariants(step.direction)}
              className="relative group"
              style={{ y: i === 0 ? step0Y : i === 1 ? step1Y : step2Y }}
            >
              {/* Enhanced connection arrows with draw effect */}
              {i < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 -right-4 z-10"
                  initial={{ opacity: 0, x: -20, scale: 0 }}
                  animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -20, scale: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5 + i * 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400/20 to-amber-400/20 backdrop-blur-sm flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-orange-500 dark:text-orange-400" />
                    </div>
                    {/* Animated line */}
                    <motion.div
                      className="absolute top-1/2 left-0 w-8 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + i * 0.2 }}
                      style={{ originX: 0 }}
                    />
                  </motion.div>
                </motion.div>
              )}
              
              <motion.div
                whileHover={{ 
                  scale: 1.03,
                  rotateY: 8,
                  rotateX: 5,
                  z: 50,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                className="h-full"
              >
                <motion.div
                  className={`relative p-8 rounded-3xl border-0 backdrop-blur-xl bg-gradient-to-br ${step.bgColor} hover:bg-white/90 dark:hover:bg-neutral-900/90 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group/card h-full overflow-hidden`}
                  whileHover={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                  }}
                >
                  {/* Gradient border effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-3xl opacity-0 group-hover/card:opacity-20 transition-opacity duration-500`} />
                  <div className="absolute inset-[1px] bg-white dark:bg-neutral-900 rounded-3xl" />
                  
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Animated icon container */}
                    <motion.div
                      className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 group-hover/card:scale-110 transition-transform duration-500`}
                      whileHover={{ 
                        rotate: [0, -5, 5, 0],
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Pulsing background effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl opacity-30`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.3,
                        }}
                      />
                      
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      <div className="text-white relative z-10">
                        {step.icon}
                      </div>
                      
                      {/* Floating particles */}
                      <motion.div
                        className="absolute -top-1 -right-1 w-2 h-2 bg-white/60 rounded-full"
                        animate={{
                          y: [0, -8, 0],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.2,
                        }}
                      />
                    </motion.div>
                    
                    {/* Content */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1"
                    >
                      <div className="flex items-center gap-3 font-bold mb-3 text-xl">
                        <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                          {step.title}
                        </span>
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        >
                          <Sparkles className="w-5 h-5 text-orange-400" />
                        </motion.div>
                      </div>
                      
                      <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">
                        {step.body}
                      </p>
                    </motion.div>
                    
                    {/* Progress indicator */}
                    <motion.div
                      className="mt-6 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.8 + i * 0.2 }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                        initial={{ width: "0%" }}
                        animate={isInView ? { width: "100%" } : { width: "0%" }}
                        transition={{ duration: 1, delay: 1 + i * 0.3 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
