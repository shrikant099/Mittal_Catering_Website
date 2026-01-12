"use client";

import { motion } from "framer-motion";

export default function WelcomeSection() {
  return (
    <section className="relative bg-primary overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 text-center text-white">
        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide"
        >
          Welcome to <span className="text-black">Mittal’s</span>
        </motion.h2>

        {/* DIVIDER */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-24 h-[2px] bg-black mx-auto my-6 origin-center"
        />

        {/* SUB TITLE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl font-semibold tracking-wide mb-10"
        >
          We believe in these eternal values
        </motion.p>

        {/* CONTENT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          className="
            max-w-4xl mx-auto
            bg-black/15
            backdrop-blur-sm
            rounded-2xl
            px-6 sm:px-10
            py-8 sm:py-10
            shadow-2xl
          "
        >
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed font-medium text-white/95">
            A customer is the most important part of our journey. Every dish we
            prepare, every service we deliver, and every event we cater is
            driven by quality, trust, hygiene, and commitment.
            <br />
            <br />
            At <strong>Mittal Catering</strong>, we don’t just serve food — we
            create experiences that bring people together, making every occasion
            memorable and special.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
