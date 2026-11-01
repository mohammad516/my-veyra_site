// Animation constants and variants for consistent animations across the app
export const animationConfig = {
  // Common transition settings
  fast: { duration: 0.2, ease: "easeOut" },
  medium: { duration: 0.4, ease: "easeOut" },
  slow: { duration: 0.6, ease: "easeOut" },
  
  // Stagger delays
  staggerFast: 0.05,
  staggerMedium: 0.1,
  staggerSlow: 0.15,
};

// Common animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

export const hoverLift = {
  whileHover: { y: -5, scale: 1.02 },
  whileTap: { y: 0, scale: 0.98 }
};

// Scroll-triggered animation variants
export const scrollReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 }
};

export const scrollRevealStagger = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true },
  variants: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animationConfig.staggerMedium
      }
    }
  }
};
