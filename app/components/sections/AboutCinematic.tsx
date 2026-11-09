"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

// WebGL is client-only and heavy, so it loads lazily after the first paint
const AboutScene = dynamic(() => import("../three/AboutScene"), { ssr: false });

const SECTIONS = ["Intro", "Story", "Numbers", "Principles", "Contact"];

const STATS = [
  { prefix: "", to: 180, suffix: "+", label: "Projects delivered" },
  { prefix: "", to: 120, suffix: "+", label: "Clients worldwide" },
  { prefix: "<", to: 150, suffix: "ms", label: "Average TTFB" },
  { prefix: "", to: 78, suffix: "", label: "Net promoter score" },
];

const VALUES = [
  {
    title: "Craft over shortcuts",
    text: "Every pixel and every query is deliberate. We ship work we're proud to sign.",
  },
  {
    title: "Performance is design",
    text: "A beautiful site that loads slowly is neither. Speed is built in from the first commit.",
  },
  {
    title: "Partners, not vendors",
    text: "We work with a small roster of ambitious teams and treat their goals as our own.",
  },
];

const MARQUEE = ["Web Design", "Development", "E-Commerce", "Mobile Apps", "SEO", "Branding"];

const GRADIENT = "bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent";

// Headline that reveals word by word from behind a mask
function RevealText({
  text,
  className,
  highlight = [],
  delay = 0,
  as: Tag = "h2",
  once = true,
}: {
  text: string;
  className?: string;
  highlight?: string[];
  delay?: number;
  as?: "h1" | "h2";
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className={`inline-block ${highlight.includes(word) ? GRADIENT : ""}`}
            initial={reduce ? false : { y: "115%", rotate: 4 }}
            animate={inView ? { y: 0, rotate: 0 } : undefined}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}

function Fade({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-cyan-300/90">
      <span className="h-px w-10 bg-gradient-to-r from-cyan-300 to-transparent" />
      {children}
    </div>
  );
}

function CountUp({ prefix, to, suffix }: { prefix: string; to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

// Outlined type that slides sideways as the page scrolls
function Marquee() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const items = [...MARQUEE, ...MARQUEE, ...MARQUEE];
  return (
    <div className="pointer-events-none mt-24 overflow-hidden" aria-hidden>
      <motion.div style={{ x }} className="flex w-max gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-6xl font-black uppercase tracking-tight text-transparent sm:text-8xl"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.22)" }}
          >
            {item}
            <span className="h-3 w-3 rounded-full bg-cyan-400/70" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Fixed progress bar and section dots
function Chrome() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement));
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400"
      />
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
        {SECTIONS.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-label={`Go to ${label}`}
            onClick={() =>
              document
                .querySelectorAll<HTMLElement>("[data-scene]")
                [i]?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="group flex items-center gap-3"
          >
            <span
              className={`text-[10px] font-semibold uppercase tracking-[0.25em] transition-all duration-300 ${
                active === i ? "translate-x-0 text-white opacity-100" : "translate-x-2 text-white/60 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                active === i ? "h-6 w-1.5 bg-gradient-to-b from-cyan-300 to-emerald-300" : "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
      <div className="fixed bottom-8 left-6 z-40 hidden items-baseline gap-2 font-mono text-xs text-white/60 lg:flex">
        <span className="text-lg font-bold text-white">{String(active + 1).padStart(2, "0")}</span>
        <span>/ {String(SECTIONS.length).padStart(2, "0")}</span>
      </div>
    </>
  );
}

export default function AboutCinematic() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 90]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="relative bg-[#05070d] text-white">
      {/* Static backdrop so the page is never empty while WebGL loads */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(34,211,238,0.10),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(52,211,153,0.08),transparent_50%)]" />
      <div className="pointer-events-none fixed inset-0 z-0">
        <AboutScene reduced={Boolean(reduce)} />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,7,13,0.85)_100%)]" />

      <Chrome />

      <div className="relative z-10">
        {/* 01 — Intro */}
        <section
          data-scene
          className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-24 pt-32 lg:px-12"
        >
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-2xl">
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Eyebrow>About Veyra</Eyebrow>
            </motion.div>
            <RevealText
              as="h1"
              text="We craft digital experiences worth remembering."
              highlight={["worth", "remembering."]}
              delay={0.3}
              className="text-5xl font-black leading-[1.02] tracking-tighter sm:text-6xl lg:text-7xl"
            />
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.1 }}
              className="mt-8 max-w-lg text-lg leading-relaxed text-neutral-300"
            >
              Veyra is a web development agency in Beirut, Lebanon — a compact team turning ambitious
              ideas into fast, beautiful products.
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.3 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-cyan-500/20 transition-transform duration-200 hover:scale-105"
              >
                Start a Project <span className="ml-2 font-light">→</span>
              </Link>
              <a
                href="#story"
                className="text-sm font-semibold text-white/80 transition-colors hover:text-cyan-300"
              >
                Our story ↓
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* 02 — Story */}
        <section
          id="story"
          data-scene
          className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-32 lg:px-12"
        >
          <div className="lg:ml-auto lg:max-w-xl">
            <Fade>
              <Eyebrow>Who we are</Eyebrow>
            </Fade>
            <RevealText
              text="Small team. Big outcomes."
              highlight={["Big", "outcomes."]}
              className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            />
            <Fade delay={0.2} className="mt-8 space-y-5 text-lg leading-relaxed text-neutral-300">
              <p>
                We&apos;re a compact product studio partnering with ambitious teams to launch sites
                that feel premium and perform flawlessly. No account managers, no hand-offs — you
                work directly with the people building your product.
              </p>
              <p>
                From Beirut to the world, we blend strategy, design and engineering to ship websites,
                stores and apps that stand up to real traffic, real users and real business goals.
              </p>
            </Fade>
          </div>
        </section>

        {/* 03 — Numbers */}
        <section
          data-scene
          className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-32 lg:px-12"
        >
          <div className="text-center">
            <Fade className="flex justify-center">
              <Eyebrow>By the numbers</Eyebrow>
            </Fade>
            <RevealText
              text="Proof, not promises."
              highlight={["promises."]}
              className="text-4xl font-black tracking-tight sm:text-6xl"
            />
          </div>
          <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {STATS.map((stat, i) => (
              <Fade key={stat.label} delay={0.1 + i * 0.1}>
                <div className="h-full rounded-3xl border border-white/10 bg-[#05070d]/50 p-6 text-center backdrop-blur-xl transition-colors duration-500 hover:border-cyan-300/40 sm:p-8">
                  <div className={`text-4xl font-black tabular-nums sm:text-5xl ${GRADIENT}`}>
                    <CountUp prefix={stat.prefix} to={stat.to} suffix={stat.suffix} />
                  </div>
                  <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    {stat.label}
                  </div>
                </div>
              </Fade>
            ))}
          </div>
          <Marquee />
        </section>

        {/* 04 — Principles */}
        <section
          data-scene
          className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-32 lg:px-12"
        >
          <div className="lg:max-w-xl">
            <Fade>
              <Eyebrow>What we believe</Eyebrow>
            </Fade>
            <RevealText
              text="Principles we build by."
              highlight={["build", "by."]}
              className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            />
            <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {VALUES.map((value, i) => (
                <Fade key={value.title} delay={0.1 + i * 0.12}>
                  <div className="group flex gap-6 py-7">
                    <span className="font-mono text-sm text-cyan-300/80">0{i + 1}</span>
                    <div>
                      <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:text-cyan-300">
                        {value.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-neutral-400">{value.text}</p>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* 05 — Contact */}
        <section
          data-scene
          className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 py-32 text-center lg:px-12"
        >
          <RevealText
            text="Let's build something extraordinary."
            highlight={["extraordinary."]}
            className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tighter sm:text-7xl"
          />
          <Fade delay={0.3}>
            <p className="mx-auto mt-8 max-w-md text-lg text-neutral-300">
              Tell us where you want to go. We&apos;ll build the way there.
            </p>
          </Fade>
          <Fade delay={0.45}>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center rounded-full bg-white px-10 py-5 text-lg font-bold text-neutral-900 shadow-2xl shadow-cyan-400/20 transition-transform duration-200 hover:scale-105"
            >
              Start a Project <span className="ml-2 font-light">→</span>
            </Link>
          </Fade>
        </section>
      </div>
    </div>
  );
}
