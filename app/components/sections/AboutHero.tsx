"use client";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const WORDS = ["build", "design", "grow"];

// Same project screenshots shown in the Work section
const PROJECTS = [
  {
    site: "energetica-me.com",
    img: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto,w_700/v1781100404/energetica-website/qufylpuo51uexzjg8aed.png",
  },
  {
    site: "nexus-nbs.com",
    img: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto,w_700/v1779026212/ChatGPT_Image_May_17_2026_04_56_41_PM_aqv7y4.webp",
  },
  {
    site: "scentodiitalia.com",
    img: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116686/p10_jlsnex.webp",
  },
  {
    site: "sensesbynature.com",
    img: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116686/p11_dmqcrm.avif",
  },
  {
    site: "akkawidesignbuild.com",
    img: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto,w_700/v1779718836/akkawi-website/enddbzxrf0ypyxskewej.jpg",
  },
  {
    site: "aquanotch.com",
    img: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762116686/p13_ubm2lp.avif",
  },
];

function RotatingWord() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // The first word is in the server-rendered HTML, so the heading reads
  // "We know how to build your brand online." for crawlers and without JS.
  // It sits on its own line so changing word widths never shifts the other text.
  return (
    <span className="block h-[1.25em] overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={WORDS[index]}
          initial={{ opacity: 0, y: "60%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-60%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="inline-block border-b-4 border-white/60 leading-[1.1]"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function ProjectGrid() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], reduceMotion ? [0, 0] : [0, -50]);

  return (
    <div className="absolute inset-0" style={{ perspective: "1600px" }}>
      <motion.div style={{ y: parallaxY }} className="absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 grid w-[1000px] grid-cols-3 gap-6"
          style={{
            transform: "translate(-34%, -46%) rotateX(56deg) rotateZ(-34deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.site}
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: "easeOut" }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
                transition={{
                  duration: 5 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30"
              >
                <Image
                  src={project.img}
                  alt={`${project.site} website designed and developed by Veyra`}
                  fill
                  sizes="280px"
                  priority={i < 3}
                  className="object-cover object-top"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const AboutHero = () => {
  return (
    <section className="relative flex-1 overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-emerald-500">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.18),_transparent_60%)]" />

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-[640px] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 max-w-xl"
        >
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white/80">
            About Veyra
          </p>
          <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
            <span className="block">We know how to</span>
            <RotatingWord />
            <span className="block">your brand online.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg">
            We&apos;re a compact product studio partnering with ambitious teams to launch sites that
            feel premium and perform flawlessly.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-bold text-neutral-900 shadow-lg transition-transform duration-200 hover:scale-105"
          >
            Start a Project
          </Link>
        </motion.div>
      </div>

      {/* Tilted project grid: below the text on mobile, bleeding off the right edge on desktop */}
      <div className="relative h-[320px] sm:h-[400px] lg:pointer-events-none lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[58%]">
        <ProjectGrid />
      </div>
    </section>
  );
};

export default AboutHero;
