"use client";
import { motion } from "framer-motion";

const About = () => {
  const metrics = [
    { key: "Projects", value: "180+", color: "from-indigo-500 to-purple-500" },
    { key: "Avg. TTFB", value: "<150ms", color: "from-emerald-500 to-teal-500" },
    { key: "NPS", value: "78", color: "from-pink-500 to-rose-500" }
  ];

  return (
    <section id="about" className="w-full py-20 relative">
      {/* Background gradient - full width */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-50/40 via-pink-50/20 to-orange-50/40 dark:from-purple-950/15 dark:via-pink-950/10 dark:to-orange-950/15 -z-10" />
      
      {/* Content container - centered with max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold"
            >
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Small team.
              </span>{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                Big outcomes.
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-4 text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed"
            >
              We&apos;re a compact product studio partnering with ambitious teams to launch sites that feel premium and perform flawlessly.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mt-8"
            >
              {metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`text-2xl font-extrabold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {metric.key}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                rotateY: 2,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <motion.img 
                  alt="team" 
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg" 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1600&auto=format&fit=crop"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ✨
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
