"use client";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Globe, ShoppingCart, Smartphone, Sparkles } from "lucide-react";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Transform values for each service card
  const service0Y = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const service1Y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const service2Y = useTransform(scrollYProgress, [0, 1], [0, 15]);
  
  // Spring values for mouse interactions
  const cardRotateX = useSpring(mousePosition.y * 10, { stiffness: 300, damping: 30 });
  const cardRotateY = useSpring(mousePosition.x * 10, { stiffness: 300, damping: 30 });

  const services = [{
    icon: <Globe className="w-6 h-6"/>,
    title: "Dynamic Website",
    price: "$250",
    body: "Lightning-fast, lightweight websites perfect for personal portfolios and small businesses. Get your professional online presence with fast delivery and affordable pricing that won't break the bank.",
    color: "from-blue-500 to-indigo-500",
    features: ["Fast Delivery", "Lightweight Design", "Affordable Pricing"],
    direction: "fade-up"
  }, {
    icon: <ShoppingCart className="w-6 h-6"/>,
    title: "eCommerce Website",
    price: "$250",
    body: "Complete online store solution with product catalog, secure cart & checkout, payment integration, and scalable design that grows with your business. Turn visitors into customers.",
    color: "from-emerald-500 to-teal-500",
    features: ["Product Catalog", "Payment Integration", "Scalable Design"],
    direction: "fade-right"
  }, {
    icon: <Smartphone className="w-6 h-6"/>,
    title: "Mobile Application",
    price: "$500",
    body: "Cross-platform mobile apps for iOS and Android with smooth UX, push notifications, and custom features. Reach your customers wherever they are with a native app experience.",
    color: "from-purple-500 to-pink-500",
    features: ["Cross-Platform", "Push Notifications", "Custom Features"],
    direction: "fade-left"
  }];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const getCardVariants = (direction: string) => ({
    hidden: {
      opacity: 0,
      y: direction === "fade-up" ? 60 : direction === "fade-left" ? 0 : 0,
      x: direction === "fade-left" ? -60 : direction === "fade-right" ? 60 : 0,
      rotateX: 20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 100
      }
    }
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <section ref={ref} id="services" className="w-full py-24 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-pink-50/60 dark:from-indigo-950/25 dark:via-purple-950/15 dark:to-pink-950/25 -z-10"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.08) 50%, rgba(236, 72, 153, 0.1) 100%)",
            "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.08) 50%, rgba(99, 102, 241, 0.1) 100%)",
            "linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(99, 102, 241, 0.08) 50%, rgba(168, 85, 247, 0.1) 100%)",
            "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.08) 50%, rgba(236, 72, 153, 0.1) 100%)"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-indigo-400/20 rounded-full blur-2xl"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Content container - centered with max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="relative inline-block">
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full opacity-60"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              <motion.span 
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                Services
              </motion.span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="text-neutral-600 dark:text-neutral-300 mt-6 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Professional solutions tailored to your business needs and budget.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="mt-8"
            >
              <Badge variant="outline" className="rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-indigo-200 dark:border-indigo-800 px-6 py-2 text-base">
                Starting from $100
              </Badge>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={getCardVariants(service.direction)}
              className="relative group"
              style={{ y: i === 0 ? service0Y : i === 1 ? service1Y : service2Y }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.03,
                  rotateY: 8,
                  rotateX: 5,
                  z: 50,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                className="h-full"
                onMouseMove={handleMouseMove}
                style={{
                  rotateX: cardRotateX,
                  rotateY: cardRotateY
                }}
              >
                <motion.div
                  className={`relative p-8 rounded-3xl border-0 backdrop-blur-xl bg-gradient-to-br from-white/70 to-white/50 dark:from-neutral-900/70 dark:to-neutral-900/50 hover:bg-white/90 dark:hover:bg-neutral-900/90 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group/card h-full overflow-hidden`}
                  whileHover={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                  }}
                >
                  {/* Gradient border effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-3xl opacity-0 group-hover/card:opacity-20 transition-opacity duration-500`} />
                  <div className="absolute inset-[1px] bg-white dark:bg-neutral-900 rounded-3xl" />
                  
                  {/* Animated price badge */}
                  <motion.div 
                    className="absolute top-4 right-4 z-10"
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 20, scale: 0.8 }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.2 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      <Badge className={`bg-gradient-to-r ${service.color} text-white border-0 shadow-lg px-4 py-2`}>
                        Starting from {service.price}
                      </Badge>
                      {/* Shimmer effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.div>
                  </motion.div>
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <CardHeader className="pb-6">
                      {/* Animated icon container */}
                      <motion.div
                        className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover/card:scale-110 transition-transform duration-500`}
                        whileHover={{ 
                          rotate: [0, -5, 5, 0],
                          scale: 1.1
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Pulsing background effect */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl opacity-30`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3,
                          }}
                        />
                        
                        {/* Gradient ring effect */}
                        <motion.div
                          className={`absolute -inset-2 bg-gradient-to-r ${service.color} rounded-2xl opacity-0 group-hover/card:opacity-50`}
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        
                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        
                        <div className="text-white relative z-10">
                          {service.icon}
                        </div>
                        
                        {/* Floating particles */}
                        <motion.div
                          className="absolute -top-1 -right-1 w-2 h-2 bg-white/60 rounded-full"
                          animate={{
                            y: [0, -8, 0],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2,
                          }}
                        />
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CardTitle className="flex items-center gap-3 text-2xl font-bold mb-2">
                          <motion.span 
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
                            animate={{
                              letterSpacing: ["0px", "1px", "0px"]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.3
                            }}
                          >
                            {service.title}
                          </motion.span>
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                          >
                            <Sparkles className="w-5 h-5 text-purple-400" />
                          </motion.div>
                        </CardTitle>
                      </motion.div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 flex-1">
                      <motion.p 
                        className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 1 + i * 0.2 }}
                      >
                        {service.body}
                      </motion.p>
                      
                      {/* Animated feature tags */}
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 1.2 + i * 0.2 }}
                      >
                        {service.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Badge 
                              variant="secondary" 
                              className="text-xs bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 text-neutral-700 dark:text-neutral-300 px-3 py-1"
                            >
                              {feature}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
