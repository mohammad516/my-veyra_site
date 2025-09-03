"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Palette, Rocket, ShieldCheck } from "lucide-react";

const Services = () => {
  const services = [{
    icon: <Palette className="w-5 h-5"/>,
    title: "Brand & UI Design",
    body: "Visual identity, wireframes, high‑fidelity designs, and design systems.",
    color: "from-pink-500 to-purple-500"
  }, {
    icon: <Rocket className="w-5 h-5"/>,
    title: "Web Development",
    body: "Next.js/React, performant landing pages, CMS integration, analytics.",
    color: "from-blue-500 to-indigo-500"
  }, {
    icon: <ShieldCheck className="w-5 h-5"/>,
    title: "Optimization & SEO",
    body: "Accessibility, Lighthouse scores, page‑speed, on‑page SEO and schema.",
    color: "from-emerald-500 to-teal-500"
  }];

  return (
    <section id="services" className="w-full py-20 relative">
      {/* Background gradient - full width */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50 dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-pink-950/20 -z-10" />
      
      {/* Content container - centered with max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold"
            >
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
                Services
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-neutral-600 dark:text-neutral-300 mt-2"
            >
              Everything you need to go from idea to launch.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Badge variant="outline" className="rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-indigo-200 dark:border-indigo-800">
              Typical timeline: 2–6 weeks
            </Badge>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * i }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 2,
                  rotateX: 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Card className="rounded-2xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80 border-neutral-200/70 dark:border-neutral-800/60 group">
                  <CardHeader>
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </motion.div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {service.body}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
