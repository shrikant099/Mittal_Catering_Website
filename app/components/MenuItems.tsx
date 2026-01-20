"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQty, increaseQty } from "@/features/cart/cartSlice";
import { clearCart } from "@/features/cart/cartSlice";

const MENU_ITEMS = [
  {
    name: "Veg Mini Thali",
    desc: "Dal, sabzi, rice, roti & salad pickel",
    price: 179,
    image:
      "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Paneer Butter Masala",
    desc: "Creamy paneer gravy (400ml)",
    price: 290,
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Veg Biryani",
    desc: "Aromatic Jain friendly biryani",
    price: 162,
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Rajma Chawal",
    desc: "Slow cooked rajma with rice",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Aloo Paneer Sabzi",
    desc: "Homestyle curry with paneer",
    price: 189,
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Veg Sandwich",
    desc: "Grilled veg sandwich combo",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&auto=format&fit=crop&q=80",
  },
];

export default function MenuSection() {
  const cart = useSelector((s: any) => s.cart.items);
  const dispatch = useDispatch();
  const inCart = (id: string) =>
    cart.find((i: { _id: string }) => i._id === id);

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADING (SEO) */}
        <div className="text-center mb-14">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold">
            Our <span className="text-primary">Menu</span>
          </h3>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            Explore our delicious catering menu featuring freshly prepared
            vegetarian meals, perfect for events, travel and daily orders.
          </p>
        </div>

        {/* MENU GRID */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="
            grid
            grid-cols-1
           sm:grid-cols-2
            lg:grid-cols-3
            gap-6 lg:gap-8
          "
        >
          {MENU_ITEMS.map((item) => (
            <motion.div
              key={item.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              className="
                bg-[#1A1A1A]
                rounded-2xl
                shadow-lg
                overflow-hidden
                border border-black/5
              "
            >
              {/* IMAGE */}
              <div className="relative w-full h-44 sm:h-48">
                <Image
                  src={item.image}
                  alt={`${item.name} by Mittal Catering`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 text-center">
                <h3 className="font-bold text-lg text-[#FFFDFC]">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-400 mt-1">{item.desc}</p>

                <p className="text-primary font-bold text-lg mt-3">
                  ₹{item.price}
                </p>

                {/* ADD TO CART */}
                {inCart(item.name) ? (
                  <div className="flex justify-center items-center gap-3 mt-4">
                    <button
                      onClick={() => dispatch(decreaseQty(item.name))}
                      className="bg-orange-500 w-9 h-9 rounded-full"
                    >
                      −
                    </button>
                    <span className="text-white font-bold">
                      {inCart(item.name).qty}
                    </span>
                    <button
                      onClick={() => dispatch(increaseQty(item.name))}
                      className="bg-orange-500 w-9 h-9 rounded-full"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      dispatch(addToCart({ ...item, _id: item.name }))
                    }
                    className="mt-4 w-full border border-primary text-primary py-2.5 rounded-lg hover:bg-primary hover:text-white"
                  >
                    Add to Cart
                  </button>
                  
                )}
                
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div
        className="
      mt-15
      flex items-center justify-center
      "
      >
        <button
          className="
               cursor-pointer
                bg-primary text-white
                px-8 py-4 rounded-lg
                font-semibold tracking-wide
                hover:bg-accent
                transition-all duration-300
              "
        >
          <Link href={"/menu"}>View Menu</Link>
        </button>
      </div>
    </section>
  );
}
