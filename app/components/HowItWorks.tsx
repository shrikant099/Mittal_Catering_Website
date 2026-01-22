"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    title: "Choose Your Catering Service",
    desc: "Explore Mittal Catering services in Ajmer for weddings, corporate events, outdoor functions and government food contracts across Rajasthan.",
    icon: "🍽️",
  },
  {
    title: "Share Event & Location Details",
    desc: "Share your event date, venue, guest count and menu preferences so our Ajmer-based team can plan everything smoothly.",
    icon: "📋",
  },
  {
    title: "Relax & Enjoy Hassle-Free Catering",
    desc: "Our experienced team handles food preparation, service flow and coordination so you can enjoy your occasion stress-free.",
    icon: "😊",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="bg-background py-16 sm:py-20"
      aria-labelledby="how-it-works"
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-14">
        <h3
          id="how-it-works"
          className="text-3xl sm:text-4xl font-extrabold text-foreground"
        >
          How <span className="text-primary">Mittal Catering</span> Works
        </h3>

        <p className="mt-4 text-foreground/70 max-w-3xl mx-auto">
          Booking trusted vegetarian catering services in Ajmer is simple with
          Mittal Catering. Follow these steps to get hygienic, well-planned food
          service for weddings, corporate events, and family functions across
          Rajasthan.
        </p>

        <span className="block w-16 h-1 bg-primary mx-auto mt-6 rounded-full" />
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="
                bg-muted
                rounded-2xl
                p-8
                text-center
                border border-white/5
                shadow-lg
              "
            >
              <div className="text-4xl mb-4 text-primary">
                {step.icon}
              </div>

              <h4 className="text-lg font-semibold text-foreground mb-3">
                {step.title}
              </h4>

              <p className="text-sm text-foreground/70 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
