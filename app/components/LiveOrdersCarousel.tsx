"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const liveOrders = [
  {
    name: "Mohit Rathod",
    train: "Jaisalmer Express",
    amount: 530,
    station: "Ajmer Junction",
  },
  {
    name: "Neha Jain",
    train: "Ashram Express",
    amount: 420,
    station: "Ajmer Junction",
  },
  {
    name: "Rakesh Sharma",
    train: "Marudhar Express",
    amount: 610,
    station: "Ajmer Junction",
  },
  {
    name: "Amit Gupta",
    train: "Delhi Sarai Rohilla Express",
    amount: 780,
    station: "Ajmer Junction",
  },
  {
    name: "Pooja Mehta",
    train: "Rajdhani Express",
    amount: 950,
    station: "Ajmer Junction",
  },
  {
    name: "Kunal Jain",
    train: "Intercity Express",
    amount: 360,
    station: "Ajmer Junction",
  },
];

export default function LiveOrdersCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % liveOrders.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const order = liveOrders[index];

  return (
    <section className="bg-background py-14" aria-labelledby="live-food-orders">
      {/* Heading */}
      <div className="text-center mb-8 px-4">
        <h2
          id="live-food-orders"
          className="text-2xl sm:text-3xl font-extrabold text-primary"
        >
          Live Food Orders at Ajmer
        </h2>
      </div>

      {/* Carousel */}
      <div className="max-w-3xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.45 }}
            className="
              bg-muted
              border border-primary/20
              shadow-lg
              rounded-xl
              px-5 py-4
              flex items-center gap-4
            "
          >
            {/* Icon */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-black text-lg">
              🚆
            </div>

            {/* Text */}
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
              <span className="font-semibold text-foreground">
                {order.name}
              </span>{" "}
              ordered food in train at{" "}
              <span className="font-medium">{order.station}</span> station in{" "}
              <span className="font-medium">{order.train}</span> for{" "}
              <span className="font-semibold text-primary">
                ₹{order.amount}
              </span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
