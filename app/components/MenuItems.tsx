"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQty, increaseQty } from "@/features/cart/cartSlice";

export default function MenuSection({ items = [] }: { items?: any[] }) {
  const cartRaw = useSelector((s: any) => s.cart?.items);
  const cart = Array.isArray(cartRaw) ? cartRaw : [];

  const dispatch = useDispatch();
  const inCart = (id: string) => cart.find((i: any) => i._id === id);

  if (items.length === 0) return null;

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADING */}
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
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="
            grid
            grid-cols-1
            min-[340px]:grid-cols-2
            lg:grid-cols-3
            gap-6 lg:gap-8
          "
        >
          {items.map((item) => {
            const finalPrice = item.discount
              ? Math.round(item.price - (item.price * item.discount) / 100)
              : item.price;

            return (
              <motion.div
                key={item._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="
                bg-[#1A1A1A]
                rounded-2xl
                shadow-lg
                overflow-hidden
                border border-black/5
                transition-transform
                md:hover:scale-[1.03]
                flex flex-col
                h-full
              "
              >
                {/* IMAGE */}
                {item.image && (
                  <div className="relative w-full h-36 sm:h-44 lg:h-48">
                    <Image
                      src={item.image}
                      alt={`${item.name} by Mittal Catering`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* CONTENT */}
                <div className="p-4 sm:p-5 text-center flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-[#FFFDFC]">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1 line-clamp-2 min-h-[40px]">
                    {item.description}
                  </p>

                  <p className="text-primary font-bold text-lg mt-3">
                    {item.variants?.length > 0 ? (
                      <>From ₹{Math.min(...item.variants.map((v: any) => v.price))}</>
                    ) : item.discount ? (
                      <>
                        <span className="line-through text-gray-500 mr-2 text-base">
                          ₹{item.price}
                        </span>
                        <span className="text-green-400">₹{finalPrice}</span>
                      </>
                    ) : (
                      <>₹{item.price}</>
                    )}
                  </p>

                  {/* BUTTONS — FIXED */}
                  <div className="mt-auto">
                    {item.variants?.length > 0 ? (
                      <Link href="/menu">
                        <button
                          className="
                        mt-4
                        w-full
                        border border-primary
                        text-primary
                        py-2.5
                        rounded-lg
                        hover:bg-primary
                        hover:text-white
                        transition-all
                      "
                        >
                          View Options
                        </button>
                      </Link>
                    ) : inCart(item.name) ? (
                      <div className="flex justify-center items-center gap-3 mt-4">
                        <button
                          onClick={() => dispatch(decreaseQty(item.name))}
                          className="bg-orange-500 w-9 h-9 rounded-full text-white text-lg"
                        >
                          −
                        </button>

                        <span className="text-white font-bold">
                          {inCart(item.name).qty}
                        </span>

                        <button
                          onClick={() => dispatch(increaseQty(item.name))}
                          className="bg-orange-500 w-9 h-9 rounded-full text-white text-lg"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          dispatch(
                            addToCart({
                              _id: item.name,
                              name: item.name,
                              image: item.image,
                              price: finalPrice,
                              originalPrice: item.price,
                            })
                          )
                        }
                        className="
                        mt-4
                        w-full
                        border border-primary
                        text-primary
                        py-2.5
                        rounded-lg
                        hover:bg-primary
                        hover:text-white
                        transition-all
                      "
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* VIEW MENU BUTTON */}
      <div className="mt-16 flex justify-center">
        <Link href="/menu">
          <button
            className="
              bg-primary
              text-white
              px-8 py-4
              rounded-lg
              font-semibold
              tracking-wide
              hover:bg-accent
              transition-all
            "
          >
            View Menu
          </button>
        </Link>
      </div>
    </section>
  );
}
