"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { ChevronRight, Sparkles } from "lucide-react";
import Section from "../../../components/ui/Section";
import { useState, useEffect } from "react";

// Particle component for sparkles around badge
const Particle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, Math.random() * 20 - 10],
      y: [0, Math.random() * 20 - 10]
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3
    }}
  />
);

// Animated blob component with morphing shapes
const MorphingBlob = ({ 
  className, 
  duration = 20, 
  delay = 0,
  yOffset = 0 
}: { 
  className: string; 
  duration?: number; 
  delay?: number;
  yOffset?: number;
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, yOffset]);
  
  return (
    <motion.div 
      className={className}
      style={{ y }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -30, 20, 0],
        scale: [1, 1.2, 0.8, 1],
        borderRadius: [
          "50% 50% 50% 50%",
          "60% 40% 60% 40%",
          "40% 60% 40% 60%",
          "50% 50% 50% 50%"
        ]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

// Typing animation component for heading
const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, 50 + delay);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return <span>{displayedText}</span>;
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 100]);

  return (
    <div id="home" className="relative overflow-hidden min-h-screen">
      {/* Enhanced morphing gradient blobs with parallax */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <MorphingBlob 
          className="absolute -top-24 -right-24 h-80 w-80 bg-gradient-to-br from-indigo-500/40 via-fuchsia-500/30 to-cyan-500/30 blur-3xl"
          duration={25}
          delay={0}
          yOffset={-100}
        />
        <MorphingBlob 
          className="absolute -bottom-24 -left-24 h-80 w-80 bg-gradient-to-tr from-emerald-400/30 via-sky-400/30 to-purple-400/30 blur-3xl"
          duration={30}
          delay={5}
          yOffset={100}
        />
        <MorphingBlob 
          className="absolute top-1/2 left-1/2 h-96 w-96 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 blur-3xl"
          duration={35}
          delay={10}
          yOffset={-50}
        />
        <MorphingBlob 
          className="absolute top-1/4 left-1/4 h-64 w-64 bg-gradient-to-br from-amber-400/20 via-orange-400/20 to-red-400/20 blur-3xl"
          duration={28}
          delay={15}
          yOffset={-75}
        />
      </div>

      {/* Enhanced floating decorative elements with parallax */}
      <motion.div
        className="absolute top-20 right-20 text-indigo-400/30"
        style={{ y: y1 }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-10 h-10" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-16 text-purple-400/20"
        style={{ y: y2 }}
        animate={{
          y: [0, 15, 0],
          rotate: [0, -10, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>

      <Section className="grid lg:grid-cols-2 gap-10 pt-20 pb-16 min-h-screen items-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ 
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 20
          }} 
          className="flex flex-col gap-8"
        >
          {/* Enhanced Badge with particle sparkles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring",
              stiffness: 200
            }}
            className="relative"
          >
            <Badge className="w-fit rounded-full px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 shadow-lg" variant="secondary">
              Design • Code • Ship
            </Badge>
            {/* Particle sparkles around badge */}
            {Array.from({ length: 8 }).map((_, i) => (
              <Particle key={i} delay={i * 0.2} />
            ))}
          </motion.div>
          
          {/* Enhanced heading with typing animation */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1.2, 
              delay: 0.4,
              type: "spring",
              stiffness: 100
            }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            <motion.span 
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 bg-clip-text text-transparent"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              <TypingText text="Crafting high‑impact" delay={0} />
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              websites that convert
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1, 
              delay: 0.6,
              type: "spring",
              stiffness: 80
            }}
            className="text-lg text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed"
          >
            We blend strategy, design, and engineering to launch fast, responsive, SEO‑ready sites. Inspired by modern, minimal agency aesthetics.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1, 
              delay: 0.8,
              type: "spring",
              stiffness: 100
            }}
            className="flex flex-wrap gap-4"
          >
            <a href="#contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button 
                  size="lg" 
                  className="rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                >
                  <motion.span
                    className="relative z-10"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      backgroundSize: "200% 100%",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text"
                    }}
                  >
                    Get a Quote
                  </motion.span>
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0"
                    animate={{
                      opacity: [0, 0.3, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </Button>
              </motion.div>
            </a>
            <a href="#work" className="inline-flex items-center gap-2 text-sm font-medium hover:underline group">
              See our work 
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronRight className="w-4 h-4 group-hover:text-indigo-500 transition-colors" />
              </motion.div>
            </a>
          </motion.div>
          
          {/* Enhanced avatars with floating animation and glow */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1, 
              delay: 1,
              type: "spring",
              stiffness: 80
            }}
            className="flex items-center gap-6 pt-4"
          >
            <div className="flex -space-x-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.2, 
                    zIndex: 10,
                    y: -5
                  }}
                  animate={{
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 0.6, 
                    delay: 1.2 + i * 0.1,
                    type: "spring",
                    stiffness: 200,
                    y: {
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2
                    }
                  }}
                  className="relative group"
                >
                  <motion.img 
                    alt="avatar" 
                    className="h-12 w-12 rounded-full ring-4 ring-white dark:ring-neutral-900 object-cover shadow-lg"
                    src={`https://i.pravatar.cc/72?img=${i+10}`}
                  />
                  {/* Glowing ring on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full ring-4 ring-indigo-400/50 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
            <motion.p 
              className="text-sm text-neutral-600 dark:text-neutral-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.8 }}
            >
              Trusted by 120+ startups and creators
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Enhanced image section with 3D tilt effect */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }} 
          transition={{ 
            duration: 1.2, 
            delay: 0.4,
            type: "spring",
            stiffness: 100
          }} 
          className="relative"
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              rotateY: 8,
              rotateX: 4,
            }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="relative group"
            style={{ perspective: "1000px" }}
          >
            {/* 3D container */}
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image 
                alt="Professional business woman" 
                className="w-full h-full object-cover" 
                src="/h4.webp"
                width={1000}
                height={1200}
                priority
              />
              
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Floating elements around image */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full shadow-lg"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -180, -360]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            {/* Glow effect behind image */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl -z-10"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
};

export default Hero;
