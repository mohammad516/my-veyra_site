"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const Logos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const brands = [
    { name: "Facebook", logo: "/logos/facebook.svg" },
    { name: "Instagram", logo: "/logos/instagram.svg" },
    { name: "TikTok", logo: "/logos/tiktok.svg" },
    { name: "X", logo: "/logos/x.svg" },
    { name: "YouTube", logo: "/logos/youtube.svg" },
    { name: "Google", logo: "/logos/google.svg" },
    { name: "WhatsApp", logo: "/logos/whatsapp.svg" },
    { name: "Telegram", logo: "/logos/telegram.svg" }
  ];

  return (
    <section ref={ref} className="w-full py-20 relative overflow-hidden">
      {/* Static background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/15 dark:to-pink-950/20 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4"
          >
            Trusted by leading platforms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
          >
            Powering creativity and innovation with the world&apos;s leading platforms.
          </motion.p>
        </motion.div>

        {/* Horizontal scrolling marquee - optimized with CSS animation */}
        <div className="overflow-hidden">
          <motion.div 
            className="flex gap-16 items-center will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              duration: 30, 
              ease: "linear",
              repeatType: "loop" as const
            }}
          >
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex-shrink-0 rounded-2xl p-6 bg-white/30 dark:bg-neutral-900/30 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 relative group/logo"
              >
                <Image 
                  src={brand.logo} 
                  alt={brand.name} 
                  width={64}
                  height={64}
                  className="h-12 md:h-16 w-auto object-contain grayscale group-hover/logo:grayscale-0 transition-all duration-300 relative z-10"
                  loading="lazy"
                  sizes="(max-width: 768px) 48px, 64px"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Logos;
