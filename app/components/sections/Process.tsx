"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Palette, Timer } from "lucide-react";

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [{
    icon: <Users className="w-6 h-6"/>,
    title: "1) Discover",
    body: "We align on goals, audience, and success metrics.",
    color: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
  }, {
    icon: <Palette className="w-6 h-6"/>,
    title: "2) Design",
    body: "Low‑fi wireframes to polished UI and interactions.",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
  }, {
    icon: <Timer className="w-6 h-6"/>,
    title: "3) Build & Ship",
    body: "Iterative development with weekly previews and QA.",
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
  }];

  return (
    <section ref={ref} id="process" className="w-full py-24 relative overflow-hidden">
      {/* Static background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-amber-50/30 to-yellow-50/40 dark:from-orange-950/15 dark:via-amber-950/10 dark:to-yellow-950/15 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
              Our Process
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-neutral-600 dark:text-neutral-300 mt-6 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A streamlined workflow that delivers results.
          </motion.p>
        </motion.div>

        {/* Steps Grid - simplified animations */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: "easeOut" }}
              className="relative group"
            >
              <div className={`relative p-8 rounded-3xl border-0 backdrop-blur-xl bg-gradient-to-br ${step.bgColor} hover:shadow-xl transition-all duration-300 h-full`}>
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                  {step.title}
                </h3>
                
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
