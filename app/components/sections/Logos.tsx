"use client";
import { motion } from "framer-motion";

const Logos = () => {
  const brands = [
    { 
      name: "Facebook", 
      logo: "/logos/facebook.svg",
      glowColor: "rgba(66, 103, 178, 0.3)"
    },
    { 
      name: "Instagram", 
      logo: "/logos/instagram.svg",
      glowColor: "rgba(225, 48, 108, 0.3)"
    },
    { 
      name: "TikTok", 
      logo: "/logos/tiktok.svg",
      glowColor: "rgba(238, 29, 82, 0.3)"
    },
    { 
      name: "X", 
      logo: "/logos/x.svg",
      glowColor: "rgba(0, 0, 0, 0.3)"
    },
    { 
      name: "YouTube", 
      logo: "/logos/youtube.svg",
      glowColor: "rgba(255, 0, 0, 0.3)"
    },
    { 
      name: "Google", 
      logo: "/logos/google.svg",
      glowColor: "rgba(66, 133, 244, 0.3)"
    },
    { 
      name: "WhatsApp", 
      logo: "/logos/whatsapp.svg",
      glowColor: "rgba(37, 211, 102, 0.3)"
    },
    { 
      name: "Telegram", 
      logo: "/logos/telegram.svg",
      glowColor: "rgba(0, 136, 204, 0.3)"
    }
  ];

  return (
    <section className="w-full py-20 relative overflow-hidden">
      {/* Animated gradient background - full width */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/15 dark:to-pink-950/20"
        animate={{
          background: [
            "linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)",
            "linear-gradient(90deg, rgba(236, 72, 153, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(147, 51, 234, 0.1) 100%)",
            "linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)",
            "linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Floating particles */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 bg-blue-400/20 rounded-full"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-6 h-6 bg-purple-400/20 rounded-full"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-3 h-3 bg-pink-400/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Content container - centered with max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4"
          >
            Trusted by leading platforms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
          >
            Powering creativity and innovation with the world's leading platforms.
          </motion.p>
        </motion.div>

        {/* Horizontal scrolling marquee */}
        <div className="overflow-hidden group">
          <motion.div 
            className="flex gap-16 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            whileHover={{ rotateY: 2 }}
          >
            {/* Duplicated logos array for seamless loop */}
            {[...brands, ...brands].map((brand, i) => (
              <motion.div
                key={`${brand.name}-${i}`}
                className="flex-shrink-0 rounded-2xl p-6 bg-white/30 dark:bg-neutral-900/30 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 relative group/logo"
                whileHover={{ 
                  scale: 1.1,
                  rotateX: 5,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                style={{
                  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1)`
                }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "linear"
                  }}
                />
                
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-12 md:h-16 w-auto object-contain grayscale group-hover/logo:grayscale-0 transition-all duration-500 relative z-10"
                  style={{
                    filter: `drop-shadow(0 0 20px ${brand.glowColor})`
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Logos;
