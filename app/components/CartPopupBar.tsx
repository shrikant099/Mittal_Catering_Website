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
          fixed bottom-5 left-1/2 -translate-x-1/2
          bg-orange-500 text-white
          px-6 py-3 rounded-2xl shadow-xl
          flex items-center gap-6
          z-50
        "
      >
        <div className="font-semibold">
          {totalQty} item(s) added
          <span className="ml-2 font-bold">₹{totalPrice}</span>
        </div>

        <Link
          href="/checkout"
          className="
            bg-white text-orange-500
            px-5 py-2 rounded-xl
            font-bold
            hover:bg-orange-100
            transition
          "
        >
          Checkout →
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
