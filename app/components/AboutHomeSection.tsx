"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutHomeSection() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-28">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative w-full h-[260px] sm:h-[320px] lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="https://res.cloudinary.com/dhxo0zx5u/image/upload/v1769174821/Home_page_rllunz.png"
              alt="Traditional vegetarian sweets and catering by Mittal Catering Ajmer"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {/* SEO HEADING */}
            <h2 className="text-3xl text-white sm:text-4xl lg:text-5xl font-extrabold">
              About <span className="text-primary">Mittal Catering</span>
            </h2>

            <p className="text-foreground/80 leading-relaxed">
              Mittal Caterers is a respected name in catering since 1983,
              providing best-in-class catering services in Ajmer and surrounding
              areas. Be it a marriage function, birthday party, or any corporate
              event, we handle every occasion with style and utmost commitment.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              We are famous for preparing{" "}
              <strong>shuddh vegetarian food</strong> cooked in pure desi ghee,
              maintaining the highest standards of hygiene, taste, and quality.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              We are market leaders in a wide variety of catering services,
              delivering memorable food experiences for weddings, corporate
              events, outdoor functions, and large gatherings.
            </p>

            {/* SUB HEADING */}
            <h3 className="text-xl font-bold pt-2 text-white">
              Mittal Catering Services
            </h3>

            <p className="text-foreground/80 leading-relaxed">
              Mittal Caterers is known for providing the best outdoor catering
              services in town. Whether it is a marriage function, birthday
              party, or corporate event, everything is treated in a special way
              to ensure complete client satisfaction.
            </p>

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/about-us"
                className="
                  inline-flex items-center
                  text-primary font-semibold
                  hover:underline
                "
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
