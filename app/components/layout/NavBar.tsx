"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "../../../components/ui/button";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -10]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  const logoRotate = useTransform(scrollY, [0, 100], [0, 5]);
  
  // Spring values for mouse interactions
  const logoRotateX = useSpring(mousePosition.y * 5, { stiffness: 300, damping: 30 });
  const logoRotateY = useSpring(mousePosition.x * 5, { stiffness: 300, damping: 30 });
  const linkRotateX = useSpring(mousePosition.y * 2, { stiffness: 300, damping: 30 });
  const linkRotateY = useSpring(mousePosition.x * 2, { stiffness: 300, damping: 30 });
  const linkX = useSpring(mousePosition.x * 3, { stiffness: 300, damping: 30 });
  const linkY = useSpring(mousePosition.y * 3, { stiffness: 300, damping: 30 });
  const buttonRotateX = useSpring(mousePosition.y * 3, { stiffness: 300, damping: 30 });
  const buttonRotateY = useSpring(mousePosition.x * 3, { stiffness: 300, damping: 30 });
  const mobileButtonRotateX = useSpring(mousePosition.y * 2, { stiffness: 300, damping: 30 });
  const mobileButtonRotateY = useSpring(mousePosition.x * 2, { stiffness: 300, damping: 30 });
  
  const links = [
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#process", label: "Process" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      setScrolled(scrollTop > 20);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = (navRef.current as HTMLElement).getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Enhanced Animated Progress Bar with Shimmer */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 z-50 overflow-hidden"
        style={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      >
        <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 origin-left" />
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        {/* Spark effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/80 to-transparent"
          animate={{
            x: ["-100%", "100%"],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>
      
      {/* Enhanced NavBar with Scroll Effects */}
      <motion.div 
        ref={navRef}
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled 
            ? 'backdrop-blur-xl bg-white/90 dark:bg-neutral-900/90 shadow-2xl border-b border-neutral-200/20 dark:border-neutral-800/20' 
            : 'backdrop-blur-md bg-white/70 dark:bg-neutral-900/70'
        }`}
        style={{ y, scale }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Enhanced Animated Gradient Background */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          animate={{
            background: scrolled ? [
              "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.08) 50%, rgba(16, 185, 129, 0.1) 100%)",
              "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(16, 185, 129, 0.08) 50%, rgba(99, 102, 241, 0.1) 100%)",
              "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(99, 102, 241, 0.08) 50%, rgba(168, 85, 247, 0.1) 100%)",
              "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.08) 50%, rgba(16, 185, 129, 0.1) 100%)"
            ] : [
              "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.03) 50%, rgba(16, 185, 129, 0.05) 100%)",
              "linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(16, 185, 129, 0.03) 50%, rgba(99, 102, 241, 0.05) 100%)",
              "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(99, 102, 241, 0.03) 50%, rgba(168, 85, 247, 0.05) 100%)",
              "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.03) 50%, rgba(16, 185, 129, 0.05) 100%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Noise overlay */}
        <motion.div
          className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
          animate={{
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo with Scroll Effects */}
            <motion.a 
              href="#home" 
              className="flex items-center gap-3 relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
              style={{ 
                scale: logoScale,
                rotate: logoRotate,
                rotateX: logoRotateX,
                rotateY: logoRotateY
              }}
            >
              <motion.div
                className="relative"
                whileHover={{ 
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <motion.img 
                  src="/log.png" 
                  alt="Logo" 
                  className="h-18 w-auto object-contain relative z-10"
                />
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {/* Pulsing ring */}
                <motion.div
                  className="absolute -inset-2 border-2 border-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.a>
            
            {/* Enhanced Desktop Navigation with Magnetic Effects */}
            <motion.nav 
              className="hidden md:flex items-center gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all duration-300 group cursor-pointer"
                  variants={linkVariants}
                  whileHover={{ 
                    y: -2,
                    scale: 1.05,
                    transition: { duration: 0.2, type: "spring", stiffness: 400 }
                  }}
                  style={{
                    rotateX: linkRotateX,
                    rotateY: linkRotateY
                  }}
                >
                  <motion.span
                    className="relative z-10"
                    style={{
                      x: linkX,
                      y: linkY
                    }}
                  >
                    {link.label}
                  </motion.span>
                  
                  {/* Enhanced Path-Draw Underline */}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
                    initial={{ width: 0, scaleX: 0 }}
                    whileHover={{ 
                      width: "100%", 
                      scaleX: 1,
                      transition: { duration: 0.4, ease: "easeOut" }
                    }}
                    style={{ transformOrigin: "left" }}
                  />
                  
                  {/* Magnetic Glow Effect */}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-emerald-500/20 rounded-full blur-sm"
                    initial={{ width: 0, scaleX: 0 }}
                    whileHover={{ 
                      width: "100%", 
                      scaleX: 1,
                      transition: { duration: 0.5, ease: "easeOut" }
                    }}
                    style={{ transformOrigin: "left" }}
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </motion.a>
              ))}
              
              {/* Enhanced CTA Button with Micro-interactions */}
              <motion.a 
                href="#contact"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2, type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  rotateX: buttonRotateX,
                  rotateY: buttonRotateY
                }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2, type: "spring", stiffness: 400 }
                  }}
                >
                  <Button className="rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 hover:from-indigo-600 hover:via-purple-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden relative group px-8 py-3">
                    <span className="relative z-10 font-semibold">Start a Project</span>
                    
                    {/* Enhanced Button Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    
                    {/* Pulsing glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-emerald-500/20 rounded-2xl blur-sm"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Sparkle effect */}
                    <motion.div
                      className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                  </Button>
                </motion.div>
              </motion.a>
            </motion.nav>
            
            {/* Enhanced Mobile Menu Button with Micro-interactions */}
            <motion.button 
              onClick={() => setOpen(!open)} 
              className="md:hidden p-3 rounded-2xl border border-neutral-300/50 dark:border-neutral-700/50 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-all duration-300 backdrop-blur-sm relative group"
              whileHover={{ 
                scale: 1.05,
                rotate: 5,
                transition: { duration: 0.2, type: "spring", stiffness: 400 }
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                rotateX: mobileButtonRotateX,
                rotateY: mobileButtonRotateY
              }}
            >
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                className="relative"
              >
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className="w-6 h-6 relative z-10"
                  animate={{
                    strokeWidth: open ? 3 : 2,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.path 
                    d="M4 6h16M4 12h16M4 18h16"
                    animate={{
                      pathLength: open ? 0 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.svg>
                
                {/* Enhanced Button Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-lg"
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Pulsing ring */}
                <motion.div
                  className="absolute -inset-1 border border-indigo-500/30 rounded-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Enhanced Mobile Menu with Spring Effects */}
      <AnimatePresence>
        {open && (
          <>
            {/* Background fade overlay */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />
            
            <motion.div 
              className="md:hidden fixed inset-x-0 top-20 z-30 border-t border-neutral-200/20 dark:border-neutral-800/20 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, height: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", y: 0, scale: 1 }}
              exit={{ opacity: 0, height: 0, y: -50, scale: 0.95 }}
              transition={{ 
                duration: 0.5, 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <motion.div 
                  className="flex flex-col gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {links.map((link) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="py-4 px-6 text-lg font-medium text-neutral-700 dark:text-neutral-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 rounded-2xl hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 group relative overflow-hidden"
                      variants={linkVariants}
                      whileHover={{ 
                        x: 10,
                        scale: 1.02,
                        transition: { duration: 0.2, type: "spring", stiffness: 400 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">{link.label}</span>
                      
                      {/* Enhanced Mobile Link Background Animation */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ transformOrigin: "left" }}
                      />
                      
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                      
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl blur-sm"
                        animate={{
                          opacity: [0, 0.3, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.a>
                  ))}
                
                  {/* Enhanced Mobile CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 300 }}
                    className="pt-4"
                  >
                    <a href="#contact" onClick={() => setOpen(false)}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 hover:from-indigo-600 hover:via-purple-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 text-lg py-4 relative overflow-hidden group">
                          <span className="relative z-10 font-semibold">Start a Project</span>
                          
                          {/* Mobile button shine effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          />
                          
                          {/* Pulsing glow */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-emerald-500/20 rounded-2xl blur-sm"
                            animate={{
                              scale: [1, 1.05, 1],
                              opacity: [0.3, 0.6, 0.3],
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
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
