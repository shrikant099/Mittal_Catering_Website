"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomeContactSection() {
  return (
    <section
      className="bg-background py-16 sm:py-20"
      aria-labelledby="contact-mittal-catering"
    >
      {/* HEADING */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-14">
        <h2
          id="contact-mittal-catering"
          className="text-3xl sm:text-4xl font-extrabold text-foreground"
        >
          Contact <span className="text-primary">Mittal Catering</span> Ajmer
        </h2>

        <p className="mt-4 text-foreground/70 max-w-3xl mx-auto">
          Get in touch with Mittal Catering Ajmer for guaranteed train food
          delivery at Ajmer Junction, bulk group orders, weddings, and corporate
          catering services. Trusted locally since 1983.
        </p>

        <span className="block w-16 h-1 bg-primary mx-auto mt-6 rounded-full" />
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-stretch">
        {/* MAP */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden border border-white/5 shadow-xl"
        >
          <iframe
            className="w-full h-[320px] md:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Mittal%20Catering%20Ajmer&output=embed"
          />
        </motion.div>

        {/* INFO CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            bg-muted
            rounded-3xl
            p-8
            shadow-xl
            border border-white/5
            flex flex-col
            justify-between
          "
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">
              Mittal Catering – Guaranteed Delivery
            </h3>

            <p className="text-foreground/70 leading-relaxed">
              Mittal Catering Ajmer is a trusted name in vegetarian catering,
              serving families, institutions, and railway passengers with pure
              Shudh Vegetarian food and dependable service. Our Google Business
              profile reflects our commitment to quality and timely delivery.
            </p>

            <div className="space-y-4 text-foreground/80 text-sm">
              <div>
                <p className="font-semibold text-foreground">📍 Address</p>
                <p>
                  Mittal Bhawan, Near All Saints School, Dhola Bhata Road, Ajmer,
                  Rajasthan – 305001
                </p>
              </div>

              <div>
                <p className="font-semibold text-foreground">📞 Phone</p>
                <p>+91 95877 48159</p>
                <p>+91 99999 74815</p>
              </div>

              <div>
                <p className="font-semibold text-foreground">✉️ Email</p>
                <a href="mailto:mittalcatering.ajmer@gmail.com" className="hover:underline">

                <p>mittalcatering.ajmer@gmail.com</p>
                </a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="tel:+919999974815"
              className="
                flex-1
                text-center
                bg-primary
                text-black
                px-6 py-3
                rounded-xl
                font-bold
                hover:opacity-90
                transition
              "
            >
              Call Now
            </Link>

            <Link
              href="/contact-us"
              className="
                flex-1
                text-center
                border border-primary
                text-primary
                px-6 py-3
                rounded-xl
                font-bold
                hover:bg-primary
                hover:text-black
                transition
              "
            >
              View Contact Details
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
