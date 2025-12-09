"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

const Work = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "abbasbaba.com",
      link: "https://www.abbasbaba.com",
      img: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116686/p8_stceu8.avif"
    },
    {
      title: "ycpros.co",
      link: "https://www.ycpros.co",
      img: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116686/p9_x3k7h3.avif"
    },
    {
      title: "scentodiitalia.com",
      link: "https://www.scentodiitalia.com",
      img: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116686/p10_jlsnex.webp"
    },
    {
      title: "sensesbynature.com",
      link: "https://www.sensesbynature.com",
      img: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116686/p11_dmqcrm.avif"
    },
    {
      title: "azeec.com",
      link: "https://www.azeec.com",
      img: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116685/p12_ittp8b.avif"
    },
    {
      title: "aquanotch.com",
      link: "https://www.aquanotch.com",
      img: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116686/p13_ubm2lp.avif"
    }
  ];

  return (
    <section ref={ref} id="work" className="w-full py-24 relative overflow-hidden">
      {/* Enhanced background with floating elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-teal-50/30 to-cyan-50/40 dark:from-emerald-950/15 dark:via-teal-950/10 dark:to-cyan-950/15 -z-10" />
      
      
      {/* Content container - centered with max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex items-end justify-between mb-16"
        >
          <div className="relative">
            {/* Decorative line */}
            <motion.div
              className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400 bg-clip-text text-transparent">
                Selected Work
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="text-neutral-600 dark:text-neutral-300 mt-4 text-lg max-w-2xl leading-relaxed"
            >
             A curated collection of innovative projects that highlight creativity, technical excellence, modern design principles, and SEO-optimized experiences built for visibility and growth.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -5 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="hidden sm:block"
          >
            <a href="#contact">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button 
                  className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all duration-500 px-8 py-4 text-lg font-semibold" 
                  variant="secondary"
                >
                  <span className="relative z-10">Start yours</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 * i,
                ease: "easeOut"
              }}
              className="group"
            >
              <div className="h-full transition-transform duration-300 hover:scale-[1.02]">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <Card className="group/card h-full rounded-3xl overflow-hidden border-0 backdrop-blur-xl bg-white/70 dark:bg-neutral-900/70 hover:bg-white/90 dark:hover:bg-neutral-900/90 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer relative">
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-[1px] bg-white dark:bg-neutral-900 rounded-3xl" />
                    
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <div className="w-full h-full relative overflow-hidden">
                          <Image 
                            src={project.img} 
                            alt={project.title}
                            fill
                            className="object-cover group-hover/card:scale-105 transition-transform duration-300 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        
                        {/* Enhanced overlay with multiple gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300" />
                        
                        {/* Visit button */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-semibold rounded-full text-white shadow-lg">
                            <span>→</span>
                            Visit Site
                          </span>
                        </div>
                      </div>
                      
                      <CardHeader className="p-6 flex-1 flex flex-col justify-center">
                        <CardTitle className="text-xl font-bold group-hover/card:text-emerald-600 dark:group-hover/card:text-emerald-400 transition-colors duration-300 leading-tight">
                          {project.title}
                        </CardTitle>
                      </CardHeader>
                    </div>
                  </Card>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
