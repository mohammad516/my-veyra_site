"use client";
import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import Section from "../../../components/ui/Section";

const Footer = () => (
  <footer className="border-t border-neutral-200/50 dark:border-neutral-800/50 mt-20 backdrop-blur-sm bg-white/50 dark:bg-neutral-900/50">
    <Section className="py-10 flex flex-col sm:flex-row gap-6 items-center justify-between">
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <img 
          src="/log.png" 
          alt="Logo" 
          className="h-14 w-auto object-contain"
        />
      </motion.div>
      
      <motion.div 
        className="text-sm text-neutral-600 dark:text-neutral-300 flex items-center gap-1"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        © {new Date().getFullYear()}. Made with{" "}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-4 h-4 text-red-500" />
        </motion.div>
        {" "}All rights reserved.
      </motion.div>
      
      <motion.a 
        href="mailto:hello@example.com" 
        className="inline-flex items-center gap-2 text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
      >
        <Mail className="w-4 h-4" />
        hello@example.com
      </motion.a>
    </Section>
  </footer>
);

export default Footer;
