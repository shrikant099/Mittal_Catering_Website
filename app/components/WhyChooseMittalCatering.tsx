"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    title: "Serving Ajmer Since 1983",
    desc: "With more than four decades of experience, Mittal Catering Ajmer has earned deep local trust by consistently delivering reliable vegetarian catering services for families, institutions, and organisations.",
    icon: "🏆",
  },
  {
    title: "Pure Shudh Vegetarian Cuisine",
    desc: "All meals are prepared using pure vegetarian ingredients and traditional cooking methods, including pure desi ghee, ensuring authentic taste and consistency across every event.",
    icon: "🥗",
  },
  {
    title: "Hygiene & Food Safety Focus",
    desc: "We follow disciplined hygiene practices during preparation, packing, and service, maintaining high food safety standards for events, rail passengers, and institutional catering.",
    icon: "🧼",
  },
  {
    title: "Guaranteed & Timely Service",
    desc: "Known for dependable delivery and organised service flow, our team ensures food reaches guests or passengers on time, whether it is a single order or a large group event.",
    icon: "⏱️",
  },
  {
    title: "Expertise Across Events & Rail Catering",
    desc: "From weddings and corporate functions to railway catering at Ajmer Junction, our experience allows us to manage scale, timing, and service challenges smoothly.",
    icon: "🚆",
  },
  {
    title: "Local Reputation Built on Trust",
    desc: "Our reputation has grown through repeat clients and word-of-mouth recommendations. Many families and organisations have trusted Mittal Catering Ajmer for generations.",
    icon: "🤝",
  },
];

export default function WhyChooseMittalCatering() {
  return (
    <section
      className="bg-background py-16 sm:py-20"
      aria-labelledby="why-choose-mittal-catering"
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-14">
        <h2
          id="why-choose-mittal-catering"
          className="text-3xl sm:text-4xl font-extrabold text-foreground"
        >
          Why Choose <span className="text-primary">Mittal Catering</span> Ajmer
        </h2>

        <p className="mt-4 text-foreground/70 max-w-3xl mx-auto">
          Mittal Catering Ajmer is a trusted name in vegetarian catering services,
          known for experience, hygiene, and dependable service across weddings,
          corporate events, government programmes, and railway food delivery.
        </p>

        <span className="block w-16 h-1 bg-primary mx-auto mt-6 rounded-full" />
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="
                bg-muted
                rounded-2xl
                p-8
                border border-white/5
                shadow-lg
              "
            >
              <div className="text-3xl mb-4 text-primary">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-foreground/70 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
