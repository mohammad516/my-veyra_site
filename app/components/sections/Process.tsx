"use client";
import { motion } from "framer-motion";
import { Users, Palette, Timer, ArrowRight } from "lucide-react";

const Process = () => {
  const steps = [{
    icon: <Users className="w-5 h-5"/>,
    title: "1) Discover",
    body: "We align on goals, audience, and success metrics.",
    color: "from-blue-500 to-indigo-500"
  }, {
    icon: <Palette className="w-5 h-5"/>,
    title: "2) Design",
    body: "Low‑fi wireframes to polished UI and interactions.",
    color: "from-purple-500 to-pink-500"
  }, {
    icon: <Timer className="w-5 h-5"/>,
    title: "3) Build & Ship",
    body: "Iterative development with weekly previews and QA.",
    color: "from-emerald-500 to-teal-500"
  }];

  return (
    <section id="process" className="w-full py-20 relative">
      {/* Background gradient - full width */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-amber-50/20 to-yellow-50/30 dark:from-orange-950/10 dark:via-amber-950/5 dark:to-yellow-950/10 -z-10" />
      
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
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                Our Process
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-neutral-600 dark:text-neutral-300 mt-2"
            >
              Transparent, collaborative, and fast.
            </motion.p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * i }}
              className="relative"
            >
              {/* Connection arrows */}
              {i < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 -right-3 z-10 text-neutral-300 dark:text-neutral-600"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              )}
              
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 2,
                }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80 hover:shadow-xl transition-all duration-300 group"
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <div className="text-white">
                    {step.icon}
                  </div>
                </motion.div>
                <div className="flex items-center gap-2 font-semibold mb-2 text-lg">
                  {step.title}
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
