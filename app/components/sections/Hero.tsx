"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { ChevronRight, Sparkles, Code2, MonitorSmartphone, LineChart } from "lucide-react";
import Section from "../../../components/ui/Section";

const Hero = () => {
  return (
    <div id="home" className="relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div 
          className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/20 to-cyan-500/20 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-400/20 via-sky-400/20 to-purple-400/20 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 h-96 w-96 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-20 text-indigo-400/20"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>

      <Section className="grid lg:grid-cols-2 gap-10 pt-20 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }} 
          className="flex flex-col gap-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className="w-fit rounded-full px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0" variant="secondary">
              Design • Code • Ship
            </Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
              Crafting high‑impact
            </span>{" "}
            websites that convert
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-neutral-600 dark:text-neutral-300 max-w-xl"
          >
            We blend strategy, design, and engineering to launch fast, responsive, SEO‑ready sites. Inspired by modern, minimal agency aesthetics.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#contact">
              <Button 
                size="lg" 
                className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get a Quote
              </Button>
            </a>
            <a href="#work" className="inline-flex items-center gap-2 text-sm font-medium hover:underline group">
              See our work 
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronRight className="w-4 h-4 group-hover:text-indigo-500 transition-colors" />
              </motion.div>
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-6 pt-2"
          >
            <div className="flex -space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.img 
                  key={i} 
                  alt="avatar" 
                  className="h-9 w-9 rounded-full ring-2 ring-white dark:ring-neutral-900 object-cover"
                  src={`https://i.pravatar.cc/72?img=${i+10}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                />
              ))}
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">Trusted by 120+ startups and creators</p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
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
            <Card className="rounded-2xl border-neutral-200/70 dark:border-neutral-800/60 shadow-lg backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  Live preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="aspect-video rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image 
                    alt="preview" 
                    className="w-full h-full object-cover" 
                    src="https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1800&auto=format&fit=crop"
                    width={1800}
                    height={1012}
                  />
                </motion.div>
                <div className="grid grid-cols-3 gap-3 mt-4 text-sm">
                  <motion.div 
                    className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Code2 className="w-4 h-4 mb-2 text-indigo-500" />
                    Clean Code
                  </motion.div>
                  <motion.div 
                    className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MonitorSmartphone className="w-4 h-4 mb-2 text-purple-500" />
                    Responsive
                  </motion.div>
                  <motion.div 
                    className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LineChart className="w-4 h-4 mb-2 text-emerald-500" />
                    SEO‑ready
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
};

export default Hero;
