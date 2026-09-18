"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const WHATSAPP_URL = "https://wa.me/96171709133";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="bg-neutral-900 text-white text-[13px] font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg"
          >
            Chat on WhatsApp
          </motion.span>
        )}
      </AnimatePresence>

      {/* Circle button */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7"
          fill="white"
          aria-hidden="true"
        >
          <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.364.638 4.574 1.749 6.481L2.667 29.333l7.07-1.724A13.28 13.28 0 0 0 16.003 29.333C23.37 29.333 29.333 23.37 29.333 16S23.37 2.667 16.003 2.667zm0 2.4c5.88 0 10.93 5.051 10.93 10.933 0 5.88-5.05 10.933-10.93 10.933a10.9 10.9 0 0 1-5.568-1.524l-.397-.242-4.197 1.022 1.065-4.07-.27-.42A10.887 10.887 0 0 1 5.07 16c0-5.882 5.052-10.933 10.933-10.933zm-3.02 5.6c-.22-.002-.454.003-.675.03-.22.026-.565.1-.862.38-.298.28-1.136 1.109-1.136 2.706s1.162 3.14 1.323 3.356c.162.216 2.247 3.592 5.548 4.893 2.73 1.075 3.29.862 3.883.809.594-.054 1.916-.783 2.186-1.54.27-.757.27-1.406.189-1.54-.08-.135-.296-.216-.621-.378-.324-.162-1.916-.945-2.213-1.053-.297-.108-.513-.162-.729.162-.216.324-.837 1.053-.999 1.215-.162.162-.351.182-.675.02-.324-.162-1.368-.504-2.606-1.607-.964-.859-1.614-1.919-1.804-2.243-.189-.324-.02-.499.143-.66.146-.146.324-.378.486-.567.162-.189.216-.324.324-.54.108-.216.054-.405-.027-.567-.08-.162-.717-1.768-.999-2.415-.252-.594-.513-.594-.729-.594z" />
        </svg>
      </motion.div>
    </a>
  );
}
