"use client";

import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div
      className="
        bg-[#1A1A1A] text-white
        animate-in slide-in-from-top fade-in duration-700
      "
    >
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          py-3 lg:py-4

          flex flex-col md:flex-row
          items-center justify-between
          gap-3

          text-base lg:text-lg
          font-semibold tracking-wide
        "
      >
        {/* EMAIL */}
        <p className="flex items-center gap-2">
          <span className="text-primary animate-pulse">E-mail:</span>
          <Link
            href="mailto:mittalcatering.ajmer@gmail.com"
            className="hover:text-primary transition-colors duration-200"
          >
            mittalcatering.ajmer@gmail.com
          </Link>
        </p>

        {/* CALL */}
        <p className="flex items-center gap-2">
          <span className="text-primary animate-pulse">Call us:</span>
          <Link
            href="tel:+919983748159"
            className="hover:text-primary transition-colors duration-200"
          >
            +91-9983748159
          </Link>
        </p>
      </div>
    </div>
  );
}
