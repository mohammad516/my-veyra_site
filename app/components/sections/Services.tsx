"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Globe, ShoppingCart, Smartphone } from "lucide-react";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [{
    icon: <Globe className="w-5 h-5"/>,
    title: "Dynamic Website",
    price: "$300",
    body: "Lightning-fast, lightweight websites perfect for personal portfolios and small businesses. Get your professional online presence with fast delivery and affordable pricing.",
    color: "from-blue-500 to-indigo-500",
    features: ["Fast Delivery", "Lightweight Design", "Affordable Pricing"],
  }, {
    icon: <ShoppingCart className="w-5 h-5"/>,
    title: "eCommerce Website",
    price: "$500",
    body: "Complete online store solution with product catalog, secure cart & checkout, payment integration, and scalable design that grows with your business.",
    color: "from-emerald-500 to-teal-500",
    features: ["Product Catalog", "Payment Integration", "Scalable Design"],
  }, {
    icon: <Smartphone className="w-5 h-5"/>,
    title: "Mobile Application",
    price: "$800",
    body: "Cross-platform mobile apps for iOS and Android with smooth UX, push notifications, and custom features. Reach your customers wherever they are.",
    color: "from-purple-500 to-pink-500",
    features: ["Cross-Platform", "Push Notifications", "Custom Features"],
  }];

  return (
    <section ref={ref} id="services" className="w-full py-24 relative overflow-hidden">
      {/* Static background gradient - no animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-purple-50/30 to-pink-50/40 dark:from-indigo-950/20 dark:via-purple-950/15 dark:to-pink-950/20 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              Services
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-neutral-600 dark:text-neutral-300 mt-6 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Professional solutions tailored to your business needs and budget.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="mt-8"
          >
            <Badge variant="outline" className="rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-indigo-200 dark:border-indigo-800 px-6 py-2 text-base">
              Starting from $300
            </Badge>
          </motion.div>
        </motion.div>

        {/* Services Grid - simplified animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: "easeOut" }}
              className="group relative h-full"
            >
              <div className="relative p-8 rounded-3xl border-0 backdrop-blur-xl bg-gradient-to-br from-white/70 to-white/50 dark:from-neutral-900/70 dark:to-neutral-900/50 hover:bg-white/90 dark:hover:bg-neutral-900/90 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full overflow-hidden">
                {/* Gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                <div className="absolute inset-[1px] bg-white dark:bg-neutral-900 rounded-3xl" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={`bg-gradient-to-r ${service.color} text-white border-0 shadow-lg px-4 py-2`}>
                    Starting from {service.price}
                  </Badge>
                </div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <CardHeader className="pb-6 px-0 pt-0">
                    {/* Icon - simplified */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                    
                    <CardTitle className="flex items-center gap-3 text-2xl font-bold mb-2">
                      <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                        {service.title}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-6 flex-1 px-0 pb-0">
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">
                      {service.body}
                    </p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <Badge 
                          key={idx}
                          variant="secondary" 
                          className="text-xs bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 text-neutral-700 dark:text-neutral-300 px-3 py-1"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
