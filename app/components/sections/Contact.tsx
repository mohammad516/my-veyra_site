"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { CheckCircle2, Send, Sparkles, AlertCircle } from "lucide-react";
import { SiTelegram, SiWhatsapp, SiLinkedin } from "react-icons/si";

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const confettiRef = useRef<(() => void) | null>(null);

  const fireConfetti = () => {
    const colors = ["#22d3ee", "#3b82f6", "#6366f1", "#10b981", "#f59e0b"];
    const count = 70;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.transform = `translateY(-20vh) rotate(${Math.random() * 360}deg)`;
      const duration = 1500 + Math.random() * 1200;
      const delay = Math.random() * 120;
      piece.style.animationDuration = duration + 'ms';
      piece.style.animationDelay = delay + 'ms';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), duration + delay + 100);
    }
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Success - show success dialog and reset form
        setOpen(true);
        setFormData({ name: '', email: '', message: '' });
        setJustSubmitted(true);
        // fire confetti
        fireConfetti();
        // reset success state after a short delay
        setTimeout(() => setJustSubmitted(false), 2000);
      } else {
        // Error from API
        setError(result.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      // Network or other errors
      setError('Network error. Please check your connection and try again.');
      console.error('Contact form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear shake after render when an error appears
  const formRef = useRef<HTMLFormElement | null>(null);
  useEffect(() => {
    if (error && formRef.current) {
      const el = formRef.current;
      el.classList.remove('shake-once');
      // force reflow then add again to retrigger
      void el.offsetWidth;
      el.classList.add('shake-once');
    }
  }, [error]);

  const features = [
    "Fixed‑scope sprints",
    "Transparent pricing", 
    "No lock‑in"
  ];

  return (
    <section id="contact" className="w-full py-20 relative">
      {/* Background gradient - full width */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/40 via-blue-50/20 to-indigo-50/40 dark:from-cyan-950/15 dark:via-blue-950/10 dark:to-indigo-950/15 -z-10" />
      
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-10 left-10 text-cyan-400/20"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-10 right-10 text-blue-400/20"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>

      {/* Content container - centered with max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
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
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                Tell us about your project
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-3 text-neutral-600 dark:text-neutral-300 text-lg"
            >
              We typically reply within one business day.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 space-y-3"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="rounded-2xl border-neutral-200 dark:border-neutral-800 backdrop-blur-xl bg-white/75 dark:bg-neutral-900/70 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]">
              <CardContent className="p-6">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm focus-glow transition-shadow"
                        placeholder="Your name"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm focus-glow transition-shadow"
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Message *
                    </label>
                    <div className="rounded-xl p-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 animate-gradient">
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full rounded-[11px] border-transparent bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm resize-none focus-glow transition-shadow"
                        placeholder="Tell us about your project..."
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </motion.div>
                  )}
                  
                  {/* Subtle subtitle above the button */}
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                    We usually reply within 24h
                  </p>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-0 overflow-hidden relative group animate-gradient"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : justSubmitted ? (
                      <>
                        <span className="mr-2">✅</span>
                        Sent
                      </>
                    ) : (
                      <>
                        <span className="mr-2 inline-block transform transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">✈️</span>
                        Send Message
                      </>
                    )}
                  </Button>

                  {/* Or reach us directly */}
                  <div className="pt-2 text-center">
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Or reach us directly</p>
                    <div className="mt-2 flex items-center justify-center gap-4">
                      <a href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="transition-transform hover:scale-110 hover-glow">
                        <SiWhatsapp className="w-5 h-5 text-emerald-500" />
                      </a>
                      <a href="https://t.me/" target="_blank" rel="noreferrer" aria-label="Telegram" className="transition-transform hover:scale-110 hover-glow">
                        <SiTelegram className="w-5 h-5 text-sky-500" />
                      </a>
                      <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-transform hover:scale-110 hover-glow">
                        <SiLinkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </a>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl border-neutral-200 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              Message Sent!
            </DialogTitle>
          </DialogHeader>
          <div className="text-neutral-600 dark:text-neutral-300">
            <p>Thank you for reaching out! We&apos;ll get back to you within one business day.</p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Contact;
