"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { ChevronRight } from "lucide-react";
import Section from "../../../components/ui/Section";

const Hero = () => {
  const ref = useRef(null);

  return (
    <div id="home" ref={ref} className="relative overflow-hidden min-h-screen">
      {/* Gentle, lightweight animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] h-[500px] w-[500px] bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-emerald-500/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[60%] -left-[10%] h-[600px] w-[600px] bg-gradient-to-tr from-emerald-500/20 via-blue-500/15 to-cyan-500/20 rounded-full blur-[120px]" 
        />
      </div>

      <Section className="grid lg:grid-cols-2 gap-10 pt-20 pb-16 min-h-screen items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
          className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full"
        >
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-[11px] font-bold tracking-[0.2em] text-neutral-500 uppercase flex items-center gap-2"
          >
            WEB DEVELOPMENT AGENCY <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-[2.5rem] sm:text-[3rem] lg:text-[2.75rem] xl:text-[3.25rem] 2xl:text-[4rem] font-black tracking-tighter leading-[1.05] text-neutral-900 dark:text-white"
          >
            <span className="block whitespace-nowrap">We turn ambitious</span>
            <span className="block whitespace-nowrap">ideas into</span>
            <span className="block whitespace-nowrap bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent pb-2">digital experiences.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed mt-2"
          >
            We design and develop high-performance websites and digital products that help brands stand out and grow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-6 mt-4"
          >
            <a href="#contact">
              <Button
                className="rounded-full px-6 py-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 hover:from-cyan-600 hover:via-blue-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start a Project <span className="ml-2 font-light">→</span>
              </Button>
            </a>
            <a href="#work" className="text-sm font-semibold text-neutral-900 dark:text-white hover:text-cyan-500 transition-colors flex items-center gap-2 group">
              Explore our work <span className="group-hover:translate-x-1 transition-transform">›</span>
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-5 pt-8"
          >
            <div className="flex -space-x-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="relative group">
                  <Image
                    alt="avatar"
                    className="h-10 w-10 rounded-full ring-2 ring-white dark:ring-neutral-900 object-cover shadow-sm transition-transform duration-200 group-hover:scale-110"
                    src={`https://i.pravatar.cc/72?img=${i + 10}`}
                    width={40}
                    height={40}
                    loading="lazy"
                    sizes="40px"
                  />
                </div>
              ))}
            </div>

            <div className="w-px h-10 bg-neutral-200 dark:bg-neutral-800" />

            <div className="flex flex-col text-[13px] text-neutral-500 dark:text-neutral-400 leading-tight">
              <span>Trusted by <span className="text-neutral-900 dark:text-white font-medium">120+ businesses</span></span>
              <span>Worldwide</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Image section - simplified, no 3D transforms */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: "easeOut"
          }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
            <Image
              alt="Professional business woman"
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/dp0wyn4dg/image/upload/v1786307317/hero_nv7djr.webp"
              width={1000}
              height={1200}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1000px"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default Hero;
