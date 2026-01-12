"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FEATURES = [
  "Always use A++ grade material with special care of hygiene",
  "Vast experience in catering services since 1983",
  "Hospitality specialists to take care of all catering needs",
  "Friendly and personal approach with every client",
  "Rich experience and expertise to ensure perfect execution",
  "Convenient, flexible and stress-free catering solutions",
  "Custom-made food as per client’s taste and requirements",
  "Timely execution and professional service delivery",
  "Experienced, customized and innovative catering solutions",
  "Available 365 days, 24×7 service support",
  "Best quality and cost-effective catering services",
  "Food supply in Trains and Buses",
  "Door-to-door food delivery facility",
  "Food services for schools, colleges, offices and departments",
  "Serving Ajmer and surrounding areas",
  "Box packaging facility available",
];

export default function FeaturesSection() {
  const [showAll, setShowAll] = useState(false);
  const [limit, setLimit] = useState(4);

  // Detect screen size
  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;

      if (width >= 1280) {
        setLimit(FEATURES.length); // desktop
      } else if (width >= 1024) {
        setLimit(8); // laptop
      } else {
        setLimit(4); // mobile
      }
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  const visibleFeatures =
    showAll || limit === FEATURES.length
      ? FEATURES
      : FEATURES.slice(0, limit);

  const shouldShowButton =
    limit !== FEATURES.length && FEATURES.length > limit;

  return (
    <section className="bg-muted text-white py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADING */}
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            Our <span className="text-primary">Features</span>
          </h3>
          <p className="mt-4 text-white/80 max-w-3xl mx-auto">
            Trusted catering services for weddings, events, institutions
            and food delivery across Rajasthan.
          </p>
        </div>

        {/* FEATURES GRID */}
        <motion.ul
          layout
          className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6 lg:gap-8
          "
        >
          <AnimatePresence>
            {visibleFeatures.map((feature, index) => (
              <motion.li
                key={feature}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
                className="
                  bg-white/5
                  border border-white/10
                  rounded-xl
                  p-6
                  hover:border-primary
                  transition-colors
                "
              >
                <div className="flex items-start gap-4">
                  <span className="min-w-[36px] h-[36px] flex items-center justify-center rounded-full bg-primary text-black font-bold">
                    {index + 1}
                  </span>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                    {feature}
                  </p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* VIEW MORE BUTTON */}
        {shouldShowButton && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="
                inline-flex items-center gap-2
                px-7 py-3
                rounded-lg
                bg-primary text-black
                font-semibold
                hover:bg-accent
                transition-all
              "
            >
              {showAll ? "View Less" : "View More Features"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
