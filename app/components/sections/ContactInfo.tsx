"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Section from "../../../components/ui/Section";

const items = [
  {
    label: "Contact",
    title: "Email Address",
    value: "info@veyra.website",
    href: "mailto:info@veyra.website",
    icon: Mail,
  },
  {
    label: "Call",
    title: "Phone Number",
    value: "+961 71 709 133",
    href: "tel:+96171709133",
    icon: Phone,
  },
  {
    label: "Address",
    title: "Primary Location",
    value: "Beirut, Lebanon",
    href: "https://maps.google.com/?q=Beirut,Lebanon",
    icon: MapPin,
  },
];

const ContactInfo = () => {
  return (
    <Section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="rounded-3xl bg-neutral-50 dark:bg-neutral-800/50 p-2"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 h-full shadow-sm border border-neutral-100 dark:border-neutral-800">
              {/* Gradient pill label */}
              <span className="inline-block bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 text-white text-sm font-semibold px-6 py-2 rounded-full mb-6">
                {item.label}
              </span>

              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="h-6 w-6 text-blue-500" strokeWidth={1.75} />
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <a
                  href={item.href}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  {item.value}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default ContactInfo;
