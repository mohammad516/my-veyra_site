"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Section from "../../../components/ui/Section";

export default function BlogHero() {
  return (
    <>
      {/* Hero image - full bleed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full aspect-[1023/1162] md:aspect-auto md:h-[75vh] overflow-hidden"
      >
        {/* Mobile hero image */}
        <Image
          alt="Veyra blog"
          className="object-contain md:hidden"
          src="/blog-main1.jpeg"
          fill
          priority
          sizes="100vw"
          quality={85}
        />
        {/* Desktop hero image */}
        <Image
          alt="Veyra blog"
          className="hidden md:block object-cover"
          src="/blog-main.png"
          fill
          priority
          sizes="100vw"
          quality={85}
        />
        {/* Colorful gradient line at the bottom of the hero */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400" />
      </motion.div>

      {/* Heading */}
      <Section className="py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-xl min-[400px]:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] whitespace-nowrap"
        >
          Our Latest Blog Posts{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
            &amp; News
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="font-script text-xs min-[400px]:text-sm sm:text-xl md:text-2xl max-w-4xl mx-auto leading-snug mt-6 whitespace-nowrap bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent pb-2"
        >
          Leading Web Development in Lebanon, Mobile Apps, and Digital Marketing
        </motion.p>
      </Section>
    </>
  );
}
