"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 lg:px-8 py-14 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* ================= LEFT CONTENT ================= */}
        <div className="space-y-6 text-center lg:text-left">
          {/* SEO KEYWORD TAG */}
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="inline-block text-primary text-sm font-semibold tracking-widest uppercase"
          >
            Premium Catering Services in Rajasthan
          </motion.span>

          {/* MAIN SEO HEADING */}
          <motion.h1
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-foreground"
          >
            Best Catering Services in India for
            <span className="text-primary"> Weddings & Events</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-base lg:text-lg text-foreground/80 max-w-xl mx-auto lg:mx-0"
          >
            Mittal Catering delivers delicious, hygienic and premium food
            services for weddings, corporate events, government contracts, train
            & bus food delivery across Rajasthan and India.
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
          >
            <Link
              href="/contact-us"
              className="
                bg-primary text-white
                px-8 py-4 rounded-lg
                font-semibold tracking-wide
                hover:bg-accent
                transition-all duration-300
              "
            >
              Book Catering Now
            </Link>

            <Link
              href="/menu"
              className="
                border border-white/20 text-white
                px-8 py-4 rounded-lg
                font-semibold tracking-wide
                hover:border-primary hover:text-primary
                transition-all duration-300
              "
            >
              View Menu
            </Link>
          </motion.div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[520px] rounded-2xl overflow-hidden shadow-2xl">
          {/* FOOD IMAGE (UNSPLASH) */}
          <Image
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="Premium catering food presentation by Mittal Catering"
            fill
            priority
            className="object-cover scale-105 hover:scale-110 transition-transform duration-700"
          />

          {/* DARK GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
