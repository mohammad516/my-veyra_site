"use client";
import { motion } from "framer-motion";
import { Code, Palette, Rocket, ShieldCheck, Zap, Globe } from "lucide-react";

const WhatWeDo = () => {
  const services = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Web Development",
      subtitle: "Modern & Scalable Solutions",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "UI/UX Design",
      subtitle: "Beautiful & Intuitive Interfaces",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=center",
      color: "from-pink-500 to-purple-500"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Digital Marketing",
      subtitle: "Growth & Brand Awareness",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=400&h=300&fit=crop&crop=center",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Security & Compliance",
      subtitle: "Protect Your Digital Assets",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop&crop=center",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Optimization",
      subtitle: "Lightning Fast Experiences",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Cloud Solutions",
      subtitle: "Scalable Infrastructure",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <section className="w-full py-20 relative overflow-hidden">
      {/* Background gradient strip - full width */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-cyan-400/20 dark:from-yellow-400/10 dark:via-pink-400/10 dark:to-cyan-400/10 blur-3xl -z-10" />
      
      {/* Content container - centered with max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered heading */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-4"
          >
            What we do?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Innovative Solutions
            </span>
            <br />
            <span className="text-neutral-900 dark:text-white">
              for Your Success
            </span>
          </motion.h2>
        </motion.div>

        {/* Service cards grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * i }}
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 shadow-lg hover:shadow-2xl transition-all duration-500"
                whileHover={{ 
                  scale: 1.05,
                  y: -10
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Background image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Floating icon */}
                <motion.div
                  className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-white">
                    {service.icon}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {service.subtitle}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDo;
