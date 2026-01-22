"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const reviews = [
  {
    name: "Rohit Sharma",
    location: "Ajmer Railway Station",
    food: "Veg Thali",
    rating: 5,
    text: "Ordered veg thali at Ajmer Railway Station and it tasted absolutely fresh. The paneer sabzi was soft, flavorful, and perfectly cooked.",
  },
  {
    name: "Neha Jain",
    location: "Ajmer",
    food: "Jain Meal",
    rating: 5,
    text: "Pure shudh vegetarian food with great hygiene. Delivery was on time and taste reminded me of home-cooked meals.",
  },
  {
    name: "Amit Gupta",
    location: "Corporate Event, Ajmer",
    food: "Event Catering",
    rating: 5,
    text: "Mittal Catering handled our corporate event perfectly. Food quality, service flow and coordination were excellent.",
  },
];

export default function CustomerReviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const review = reviews[index];

  return (
    <section
      className="bg-background py-16 sm:py-20"
      aria-labelledby="customer-reviews"
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto px-4 text-center mb-12">
        <h2
          id="customer-reviews"
          className="text-3xl sm:text-4xl font-extrabold text-foreground"
        >
          What Our <span className="text-primary">Customers Say</span>
        </h2>

        <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
          Real reviews from customers who experienced Mittal Catering’s
          vegetarian food services in Ajmer, including railway meals and event
          catering.
        </p>

        <span className="block w-16 h-1 bg-primary mx-auto mt-6 rounded-full" />
      </div>

      {/* Carousel */}
      <div className="max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="
              bg-muted
              border border-white/5
              shadow-lg
              rounded-2xl
              p-8
              text-center
            "
          >
            {/* Stars */}
            <div className="flex justify-center mb-4">
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i} className="text-primary text-lg">★</span>
              ))}
            </div>

            {/* Review */}
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-6">
              “{review.text}”
            </p>

            {/* Name */}
            <h3 className="text-base font-semibold text-foreground">
              {review.name}
            </h3>

            <p className="text-sm text-foreground/60">
              {review.location}
            </p>

            <p className="text-sm font-medium text-primary mt-1">
              {review.food}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
