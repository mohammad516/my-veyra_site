"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

const Work = () => {
  const projects = [
    {
      title: "Fintech Analytics",
      img: "https://images.unsplash.com/photo-1551281044-8cc9bdb156f9?q=80&w=1600&auto=format&fit=crop",
      category: "Analytics"
    },
    {
      title: "Creator Portfolio",
      img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
      category: "Portfolio"
    },
    {
      title: "SaaS Dashboard",
      img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
      category: "Dashboard"
    },
  ];

  return (
    <section id="work" className="w-full py-20 relative">
      {/* Background gradient - full width */}
      <div className="absolute inset-0 bg-gradient-to-bl from-emerald-50/30 via-teal-50/20 to-cyan-50/30 dark:from-emerald-950/10 dark:via-teal-950/5 dark:to-cyan-950/10 -z-10" />
      
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
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400 bg-clip-text text-transparent">
                Selected Work
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-neutral-600 dark:text-neutral-300 mt-2"
            >
              Recent launches from startups and creators.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden sm:block"
          >
            <a href="#contact">
              <Button 
                className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                variant="secondary"
              >
                Start yours
              </Button>
            </a>
          </motion.div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
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
                }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group rounded-2xl overflow-hidden border-neutral-200 dark:border-neutral-800 backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80 hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <motion.img 
                      src={project.img} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="inline-block px-3 py-1 bg-white/90 dark:bg-neutral-900/90 text-sm font-medium rounded-full text-neutral-900 dark:text-white">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
