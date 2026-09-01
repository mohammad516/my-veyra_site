"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Code, PenTool, Megaphone, ShieldCheck, Zap, Cloud, Box, Rocket, TrendingUp, ArrowRight } from "lucide-react";

const WhatWeDo = () => {
  const services = [
    {
      id: "01",
      icon: <Code className="w-4 h-4" />,
      title: "Web Development",
      description: "High-performance websites and web applications built for scale and results.",
      image: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1787679586/reere_a9ivcy.webp",
      textColor: "text-cyan-400",
      borderColor: "border-cyan-400/30",
      glowColor: "from-cyan-400/20",
    },
    {
      id: "02",
      icon: <PenTool className="w-4 h-4" />,
      title: "UI / UX Design",
      description: "Beautiful, intuitive interfaces that create meaningful user experiences.",
      image: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1787679117/wqqwqw_zj6pg9.webp",
      textColor: "text-blue-500",
      borderColor: "border-blue-500/30",
      glowColor: "from-blue-500/20",
    },
    {
      id: "03",
      icon: <Megaphone className="w-4 h-4" />,
      title: "Digital Marketing",
      description: "Data-driven strategies that increase visibility, engagement and conversions.",
      image: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116685/p4_bectmc.jpg",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-400/30",
      glowColor: "from-emerald-400/20",
    },
    {
      id: "05",
      icon: <Zap className="w-4 h-4" />,
      title: "Performance Optimization",
      description: "Faster websites. Better experiences. Higher conversions.",
      image: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116686/p6_fuk7q1.jpg",
      textColor: "text-cyan-400",
      borderColor: "border-cyan-400/30",
      glowColor: "from-cyan-400/20",
    },
    {
      id: "04",
      icon: <ShieldCheck className="w-4 h-4" />,
      title: "Security & Compliance",
      description: "Protect your business and customer data with industry-leading security practices.",
      image: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116686/p5_ycwdxu.jpg",
      textColor: "text-blue-500",
      borderColor: "border-blue-500/30",
      glowColor: "from-blue-500/20",
    },
    {
      id: "06",
      icon: <Cloud className="w-4 h-4" />,
      title: "Cloud Solutions",
      description: "Scalable, secure and reliable cloud infrastructure for your business.",
      image: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116686/p7_az1elo.jpg",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-400/30",
      glowColor: "from-emerald-400/20",
    }
  ];



  return (
    <section className="w-full py-24 relative overflow-hidden bg-white dark:bg-[#030303]" id="services">
      {/* Background ambient glow - very subtle */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-100 via-white to-white dark:from-[#111] dark:via-[#030303] dark:to-[#030303] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16 flex flex-col items-center justify-center px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xs font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4 uppercase"
          >
            What we do
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-neutral-900 dark:text-white leading-[1.1] max-w-3xl mx-auto tracking-tight text-balance"
          >
            Experiences that <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">move businesses forward.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed"
          >
            We combine strategy, design, and technology to help your brand thrive in the digital world.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-neutral-200 dark:border-[#1f1f1f] flex flex-col sm:flex-row min-h-[320px] hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors duration-300`}
            >
              {/* Inner ambient glow based on service color */}
              <div className={`absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br ${service.glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl z-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none`} />

              {/* Image Section - FULL CARD WIDTH */}
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  quality={85}
                />
                {/* Universal Dark Gradient Overlays for Text Readability */}
                <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20" />
                <div className="block sm:hidden absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20" />
              </div>

              {/* Content Section */}
              <div className="relative z-10 p-8 w-full sm:w-[70%] flex flex-col justify-center h-full min-h-[320px]">
                {/* Icon Circle */}
                <div className={`w-9 h-9 rounded-full border ${service.borderColor} flex items-center justify-center mb-6 ${service.textColor} bg-black/40 backdrop-blur-sm`}>
                  {service.icon}
                </div>
                
                {/* Number */}
                <div className={`text-5xl font-thin tracking-tight mb-4 ${service.textColor}`}>
                  {service.id}
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-medium text-white mb-3 drop-shadow-md">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-[13px] text-neutral-300 mb-8 leading-relaxed max-w-[280px] drop-shadow-md">
                  {service.description}
                </p>
                
                {/* Link */}
                <a 
                  href="#contact" 
                  className={`mt-auto inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider ${service.textColor} opacity-90 hover:opacity-100 transition-opacity group-hover:gap-3 duration-300 drop-shadow-md`}
                >
                  Explore service <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>



      </div>
    </section>
  );
};

export default WhatWeDo;
