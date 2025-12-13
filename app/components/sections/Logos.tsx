"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
  GoogleIcon,
  WhatsAppIcon,
  TelegramIcon,
} from "@/components/ui/logos";

const Logos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [columnCount, setColumnCount] = useState(4);

  useEffect(() => {
    const updateColumnCount = () => {
      // 3 columns on mobile (screens < 768px), 4 columns on larger screens
      setColumnCount(window.innerWidth < 768 ? 3 : 4);
    };

    // Set initial value
    updateColumnCount();

    // Update on resize
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  const brands = [
    { name: "Facebook", id: 1, img: FacebookIcon },
    { name: "Instagram", id: 2, img: InstagramIcon },
    { name: "TikTok", id: 3, img: TikTokIcon },
    { name: "X", id: 4, img: XIcon },
    { name: "YouTube", id: 5, img: YouTubeIcon },
    { name: "Google", id: 6, img: GoogleIcon },
    { name: "WhatsApp", id: 7, img: WhatsAppIcon },
    { name: "Telegram", id: 8, img: TelegramIcon },
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

        {/* Logo Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center items-center min-h-[200px]"
        >
          <LogoCarousel columnCount={columnCount} logos={brands} />
        </motion.div>
      </div>
    </section>
  );
};

export default Logos;
