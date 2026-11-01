"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Code, PenTool, Megaphone, ShieldCheck, Zap, Cloud, ArrowRight, Globe, Smartphone } from "lucide-react";

const WhatWeDo = () => {
  const services = [
    {
      id: "01",
      icon: <Code className="w-4 h-4" />,
      title: "Website Development",
      description: "Veyra builds powerful online experiences with fast, secure, and responsive websites tailored to your business goals. From professional business websites and dynamic portfolios to fully functional online stores, we create custom websites from scratch or use platforms like WordPress, Shopify, and WooCommerce, choosing the right solution based on your business needs to deliver seamless user experiences and drive growth.",
      image: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1787679586/reere_a9ivcy.webp",
      textColor: "text-cyan-400",
      borderColor: "border-cyan-400/30",
      glowColor: "from-cyan-400/20",
    },
    {
      id: "02",
      icon: <PenTool className="w-4 h-4" />,
      title: "Web Design",
      description: "Capture attention with modern UI/UX design that balances aesthetics, functionality, and user intent. We craft unique visual identities that reflect your brand’s professionalism and provide an intuitive experience for every visitor.",
      image: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1787679117/wqqwqw_zj6pg9.webp",
      textColor: "text-blue-500",
      borderColor: "border-blue-500/30",
      glowColor: "from-blue-500/20",
    },
    {
      id: "03",
      icon: <Megaphone className="w-4 h-4" />,
      title: "Digital Marketing",
      description: "Drive immediate results with data-driven marketing strategies. From Google Ads (PPC) and Meta Ads (Facebook & Instagram) to TikTok Ads and targeted lead generation, we create effective digital campaigns that maximize your ROI, increase brand awareness, and turn potential customers into long-term clients.",
      image: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116685/p4_bectmc.jpg",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-400/30",
      glowColor: "from-emerald-400/20",
    },
    {
      id: "05",
      icon: <Zap className="w-4 h-4" />,
      title: "Search Engine Optimization (SEO)",
      description: "Get found by the right audience. Our SEO services focus on Technical SEO, On-Page Optimization, and Generative Engine Optimization (GEO) to improve your brand’s visibility across Google, Bing, and AI-powered search platforms.",
      image: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116686/p6_fuk7q1.jpg",
      textColor: "text-cyan-400",
      borderColor: "border-cyan-400/30",
      glowColor: "from-cyan-400/20",
    },
    {
      id: "04",
      icon: <ShieldCheck className="w-4 h-4" />,
      title: "Maintenance and Support",
      description: "Ensure your digital platforms remain secure and up-to-date with our proactive maintenance and technical assistance. From speed audits to security patches, we handle the technology so you can focus on your business.",
      image: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116686/p5_ycwdxu.jpg",
      textColor: "text-blue-500",
      borderColor: "border-blue-500/30",
      glowColor: "from-blue-500/20",
    },
    {
      id: "06",
      icon: <Cloud className="w-4 h-4" />,
      title: "Web & App Hosting",
      description: "Experience 99.9% uptime with our secure, high-performance managed hosting solutions, optimized for speed and reliability. We protect your data with daily backups and advanced security measures, ensuring your website and applications remain fast, secure, and accessible 24/7.",
      image: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116686/p7_az1elo.jpg",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-400/30",
      glowColor: "from-emerald-400/20",
    },
    {
      id: "07",
      icon: <Globe className="w-4 h-4" />,
      title: "Domain Registration",
      description: "Secure your professional identity with a wide range of domain extensions, including .com, .co, .net, and .org. We handle the entire registration process to help protect your brand name and establish a strong online identity.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      textColor: "text-cyan-400",
      borderColor: "border-cyan-400/30",
      glowColor: "from-cyan-400/20",
    },
    {
      id: "08",
      icon: <Smartphone className="w-4 h-4" />,
      title: "Mobile App Development",
      description: "Scale your reach with custom iOS and Android applications. Using modern frameworks like FlutterFlow and React Native, we develop high-performance, intuitive mobile apps that deliver a premium user experience and keep your customers engaged on the go.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      textColor: "text-blue-500",
      borderColor: "border-blue-500/30",
      glowColor: "from-blue-500/20",
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
            className="font-script text-2xl sm:text-3xl max-w-2xl mx-auto leading-snug text-neutral-500 dark:text-neutral-400 pb-2"
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
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] group-hover:bg-black/50 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
              </div>

              {/* Content Section */}
              <div className="relative z-10 p-8 w-full flex flex-col items-center justify-center text-center h-full min-h-[320px]">
                {/* Title */}
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                  {service.title}
                </h3>

                {/* Accent divider */}
                <div className={`h-1 w-14 rounded-full mb-5 ${service.textColor} bg-current opacity-80`} />

                {/* Description */}
                <p className="text-[15px] text-neutral-300 mb-8 leading-relaxed max-w-md drop-shadow-md">
                  {service.description}
                </p>

                {/* Link */}
                <a
                  href="#contact"
                  className={`mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full border ${service.borderColor} ${service.textColor} bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-300 group-hover:gap-3`}
                >
                  Explore service <ArrowRight className="w-3.5 h-3.5" />
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
