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
      {/* Simplified static background gradients - no animation */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-80 w-80 bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/15 to-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 bg-gradient-to-tr from-emerald-400/20 via-sky-400/15 to-purple-400/20 rounded-full blur-3xl" />
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
            className="flex flex-col gap-4 sm:gap-6 md:gap-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1,
              ease: "easeOut"
            }}
          >
            <Badge className="w-fit rounded-full px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 shadow-lg" variant="secondary">
              Web • Development • Agency
            </Badge>
          </motion.div>
          
          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: 0.2,
              ease: "easeOut"
            }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.1]"
          >
            <motion.span 
              className="block bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 bg-clip-text text-transparent mb-1 sm:mb-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Creating Digital Experiences
            </motion.span>
            <motion.span 
              className="block text-neutral-900 dark:text-white mt-1 sm:mt-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              That Drive Growth
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: 0.3,
              ease: "easeOut"
            }}
            className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed"
          >
A web development agency based in Beirut, Lebanon, driven by a strong belief in the power of technology to transform business practices and create lasting digital impact.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: 0.4,
              ease: "easeOut"
            }}
            className="flex flex-wrap gap-4"
          >
            <a href="#contact">
              <Button 
                size="lg" 
                className="rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get a Quote
              </Button>
            </a>
            <a href="#work" className="inline-flex items-center gap-2 text-sm font-medium hover:underline group transition-colors duration-200">
              See our work
              <ChevronRight className="w-4 h-4 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-200" />
            </a>
          </motion.div>
          
          {/* Trust indicators - simplified */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-6 pt-4"
          >
            <div className="flex -space-x-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="relative group"
                >
                  <Image 
                    alt="avatar" 
                    className="h-12 w-12 rounded-full ring-4 ring-white dark:ring-neutral-900 object-cover shadow-lg transition-transform duration-200 group-hover:scale-110"
                    src={`https://i.pravatar.cc/72?img=${i+10}`}
                    width={48}
                    height={48}
                    loading="lazy"
                    sizes="48px"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Trusted by <span className="font-semibold text-neutral-900 dark:text-white">120+</span> startups and creators
            </p>
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
              src="https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762117639/h4_e9dgim.webp"
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
