"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const WA_BASE = "https://wa.me/96171709133?text=";

const services = [
  {
    number: "01",
    category: "PORTFOLIO & BUSINESS",
    title: "A website that makes people take you seriously.",
    description:
      "Whether you're a freelancer, a small business, or a growing brand — we build you a clean, fast portfolio or business site that looks legit and gets people to reach out.",
    price: "300",
    whatsapp: WA_BASE + encodeURIComponent("Hey! I'm interested in a Portfolio / Business Website. Can you tell me more? 👋"),
    image:
      "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1789751129/qwqwqw_kqeo57.webp",
    imageAlt: "Veyra portfolio and business website services in Lebanon",
    imageRight: true,
  },
  {
    number: "02",
    category: "E-COMMERCE",
    title: "An online store that actually sells.",
    description:
      "We build full online stores — product pages, smooth checkout, payment integration, the works. Everything your customers need to go from browsing to buying without friction.",
    price: "500",
    whatsapp: WA_BASE + encodeURIComponent("Hey! I'm interested in an eCommerce website. Can you tell me more? 🛒"),
    image:
      "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1789750762/wqwqwqqw_tme6rz.webp",
    imageAlt: "Veyra eCommerce website services in Lebanon",
    imageRight: false,
  },
  {
    number: "03",
    category: "MOBILE APPLICATIONS",
    title: "Apps your users actually want to open.",
    description:
      "iOS and Android apps built to feel native, run fast, and keep people coming back. We handle everything from design to App Store submission.",
    price: "800",
    whatsapp: WA_BASE + encodeURIComponent("Hey! I'm interested in a Mobile App. Can you tell me more? 📱"),
    image:
      "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1789750118/qwq_w55v8c.webp",
    imageAlt: "Veyra mobile app development services in Lebanon",
    imageRight: true,
  },
  {
    number: "04",
    category: "DOMAIN & HOSTING",
    title: "Your website, live and locked down.",
    description:
      "We take care of domain registration, high-performance hosting, and security — so your site stays fast, safe, and online around the clock. No tech headaches, just results.",
    price: "99",
    priceLabel: "Starting from $99/yr",
    whatsapp: WA_BASE + encodeURIComponent("Hey! I'm interested in Domain & Hosting services. Can you tell me more? 🌐"),
    image:
      "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1789752292/rereerre_kx84fs.jpg",
    imageAlt: "Veyra domain and web hosting services in Lebanon",
    imageRight: false,
  },
  {
    number: "05",
    category: "BUSINESS EMAIL",
    title: "An email address that means business.",
    description:
      "Ditch the Gmail. We set you up with a professional email on your own domain — Google Workspace, Microsoft 365, or Zoho — so every message you send builds trust.",
    price: "79",
    priceLabel: "Starting from $79/yr",
    whatsapp: WA_BASE + encodeURIComponent("Hey! I'm interested in Business Email setup. Can you tell me more? 📧"),
    image:
      "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1789752573/7e49afe2-bc55-4907-bdf3-9e8e9973482e_shrcki.webp",
    imageAlt: "Veyra professional business email services in Lebanon",
    imageRight: true,
  },
  {
    number: "06",
    category: "CUSTOM SOFTWARE",
    title: "Software built for the way you actually work.",
    description:
      "Off-the-shelf tools don't always fit. We build custom systems — clinic management, POS, inventory, employee tracking, analytics — tailored exactly to your business workflow.",
    price: "1,200",
    priceLabel: "Starting from $1,200",
    whatsapp: WA_BASE + encodeURIComponent("Hey! I'm interested in a Custom Software solution. Can you tell me more? 💻"),
    image:
      "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1789752871/fdss_u1hfgq.webp",
    imageAlt: "Veyra custom software development services in Lebanon",
    imageRight: false,
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="services"
      className="w-full py-20 relative overflow-hidden bg-white dark:bg-neutral-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {/* OUR SERVICES label with lines */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-cyan-500" />
            <p className="text-[11px] font-bold tracking-[0.25em] text-cyan-600 dark:text-cyan-400 uppercase">
              Our Services
            </p>
            <div className="h-px w-10 bg-cyan-500" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-neutral-900 dark:text-white leading-tight">
            Digital solutions for
            <br />
            <span className="text-neutral-900 dark:text-white">real </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
              business growth.
            </span>
          </h2>

          <p className="mt-6 text-neutral-500 dark:text-neutral-400 text-base max-w-xl mx-auto leading-relaxed">
            We build fast, scalable and visually stunning digital products — tailored to your goals, your brand and your customers.
          </p>
        </motion.div>

        {/* Service Rows */}
        <div>
          {services.map((service, i) => {
            const textContent = (
              <motion.div
                key={`text-${i}`}
                initial={{ opacity: 0, x: service.imageRight ? -40 : 40 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: service.imageRight ? -40 : 40 }
                }
                transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: "easeOut" }}
                className="flex flex-col justify-center py-4"
              >
                {/* Number + line */}
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="text-[5rem] lg:text-[6.5rem] font-black leading-none select-none"
                    style={{ color: "#e8eaed" }}
                  >
                    {service.number}
                  </span>
                  <div className="h-px w-8 bg-neutral-300 dark:bg-neutral-700 self-center mt-4" />
                </div>

                {/* Category */}
                <p className="text-[10px] font-bold tracking-[0.25em] text-cyan-600 dark:text-cyan-400 uppercase mb-3">
                  {service.category}
                </p>

                {/* Title */}
                <h3 className="text-3xl lg:text-[2.25rem] font-bold text-neutral-900 dark:text-white leading-tight mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-[15px] max-w-sm mb-8">
                  {service.description}
                </p>

                {/* Price CTA */}
                <a
                  href={service.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-neutral-900 dark:text-white font-semibold text-base group w-fit hover:gap-3 transition-all duration-200"
                >
                  {service.priceLabel ?? `Starting from $${service.price}`}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </motion.div>
            );

            const imageContent = (
              <motion.div
                key={`img-${i}`}
                initial={{ opacity: 0, x: service.imageRight ? 40 : -40 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: service.imageRight ? 40 : -40 }
                }
                transition={{ duration: 0.6, delay: 0.2 + i * 0.05, ease: "easeOut" }}
                className="rounded-3xl overflow-hidden shadow-2xl w-full"
              >
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={1200}
                  height={900}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              </motion.div>
            );

            return (
              <div
                key={i}
                className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center py-12 lg:py-16 border-b border-neutral-100 dark:border-neutral-800/60 last:border-b-0"
              >
                {service.imageRight ? (
                  <>
                    {textContent}
                    {imageContent}
                  </>
                ) : (
                  <>
                    <div className="order-2 lg:order-1">{imageContent}</div>
                    <div className="order-1 lg:order-2">{textContent}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

