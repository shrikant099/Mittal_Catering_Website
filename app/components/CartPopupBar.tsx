"use client";
import { useSelector } from "react-redux";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function CartPopupBar() {
  const pathname = usePathname();

  if (pathname === "/checkout") return null;
  if (pathname === "/order/success") return null;
  if (pathname === "/admin") return null;
  if (pathname === "/admin/blogs") return null;
  if (pathname === "/admin/categories") return null;
  if (pathname === "/admin/menu-items") return null;
  if (pathname === "/admin/orders") return null;
  if (pathname === "/login") return null;
  if (pathname === "/signup") return null;
  if (pathname === "/checkout") return null;
  if (pathname === "/thank-you") return null;

  const cart = useSelector((s: any) => s.cart.items);

  const totalQty = cart.reduce((a: number, b: any) => a + b.qty, 0);
  const totalPrice = cart.reduce((a: number, b: any) => a + b.qty * b.price, 0);

  if (!totalQty) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="
          fixed
          bottom-4 sm:bottom-5
          left-1/2 -translate-x-1/2
          w-[92%] sm:w-auto
          max-w-md
          bg-primary text-black
          px-4 sm:px-6
          py-3
          rounded-2xl
          shadow-xl
          flex flex-col sm:flex-row
          items-center justify-between
          gap-3 sm:gap-6
          z-50
        "
      >
        {/* TEXT */}
        <div className="font-semibold text-sm sm:text-base text-center sm:text-left">
          {totalQty} item(s) added
          <span className="ml-2 font-bold">₹{totalPrice}</span>
        </div>

        {/* CTA */}
        <Link
          href="/checkout"
          className="
            w-full sm:w-auto
            text-center
            bg-background text-primary
            px-5 py-2.5
            rounded-xl
            font-bold
            border border-black/10
            hover:bg-muted
            transition
          "
        >
          Checkout →
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
