"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../components/ui/button";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const links = [
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#process", label: "Process" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      setScrolled(scrollTop > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Animated Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 origin-left z-50"
        style={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />
      
      {/* Enhanced NavBar */}
      <motion.div 
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled 
            ? 'backdrop-blur-xl bg-white/90 dark:bg-neutral-900/90 shadow-2xl border-b border-neutral-200/20 dark:border-neutral-800/20' 
            : 'backdrop-blur-md bg-white/70 dark:bg-neutral-900/70'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated Gradient Background */}
        {scrolled && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 via-purple-50/20 to-emerald-50/30 dark:from-indigo-950/20 dark:via-purple-950/15 dark:to-emerald-950/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <motion.a 
              href="#home" 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
            >
              <motion.img 
                src="/log.png" 
                alt="Logo" 
                className="h-18 w-auto object-contain"
                whileHover={{ 
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
              />
            </motion.a>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all duration-300 group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ 
                    y: -2,
                    scale: 1.05,
                    transition: { duration: 0.2, type: "spring", stiffness: 400 }
                  }}
                >
                  {link.label}
                  {/* Enhanced Gradient Underline */}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  {/* Subtle Glow Effect */}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-emerald-500/20 rounded-full blur-sm"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </motion.a>
              ))}
              
              {/* Enhanced CTA Button */}
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
              >
                <Button className="rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 hover:from-indigo-600 hover:via-purple-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden relative group">
                  <span className="relative z-10">Start a Project</span>
                  {/* Button Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </Button>
              </motion.a>
            </nav>
            
            {/* Enhanced Mobile Menu Button */}
            <motion.button 
              onClick={() => setOpen(!open)} 
              className="md:hidden p-3 rounded-2xl border border-neutral-300/50 dark:border-neutral-700/50 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05,
                rotate: 5,
                transition: { duration: 0.2, type: "spring", stiffness: 400 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                className="relative"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                  <path d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                {/* Button Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-lg"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div 
            className="md:hidden fixed inset-x-0 top-20 z-30 border-t border-neutral-200/20 dark:border-neutral-800/20 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-2xl"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ 
              duration: 0.4, 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col gap-4">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="py-3 px-4 text-lg font-medium text-neutral-700 dark:text-neutral-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 rounded-2xl hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 group relative overflow-hidden"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: i * 0.1, 
                      type: "spring", 
                      stiffness: 300 
                    }}
                    whileHover={{ 
                      x: 10,
                      scale: 1.02,
                      transition: { duration: 0.2, type: "spring", stiffness: 400 }
                    }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {/* Mobile Link Background Animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ transformOrigin: "left" }}
                    />
                  </motion.a>
                ))}
                
                {/* Mobile CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 300 }}
                  className="pt-4"
                >
                  <a href="#contact" onClick={() => setOpen(false)}>
                    <Button className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 hover:from-indigo-600 hover:via-purple-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 text-lg py-4">
                      Start a Project
                    </Button>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
