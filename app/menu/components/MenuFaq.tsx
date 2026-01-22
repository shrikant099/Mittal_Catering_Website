"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { addToCart, decreaseQty, increaseQty } from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryItems } from "@/features/menuPublic/menuSlicePublic";

export default function MenuFaq({ categories }: { categories: any[] }) {
  const itemsByCategory = useSelector((s: any) => s.menuPublic.itemsByCategory);

  const cart = useSelector((s: any) => s.cart.items);

  const inCart = (id: string) =>
    cart.find((i: { _id: string }) => i._id === id);

  const [open, setOpen] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function loadItems(id: string) {
    setOpen(id === open ? null : id);
    if (id === open) return;

    const cached = itemsByCategory[id];
    if (cached) {
      setItems(cached);
      return;
    }

    setLoading(true);
    const res = await fetch(`/api/menu?category=${id}&status=active`);
    const data = await res.json();

    dispatch(setCategoryItems({ categoryId: id, items: data.data }));
    setItems(data.data);
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {categories.map((c) => (
        <div
          key={c._id}
          className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-lg"
        >
          {/* HEADER */}
          <button
            onClick={() => loadItems(c._id)}
            className="w-full flex items-center gap-5 p-5 text-left hover:bg-white/5 transition"
          >
            <Image
              src={c.thumbnail}
              alt={c.name}
              width={70}
              height={70}
              className="rounded-xl object-cover"
            />

            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{c.name}</h2>
              <p className="text-sm text-white/50">Tap to view items</p>
            </div>

            <motion.span
              animate={{ rotate: open === c._id ? 180 : 0 }}
              className="text-3xl text-primary"
            >
              ⌄
            </motion.span>
          </button>

          {/* BODY */}
          <AnimatePresence>
            {open === c._id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-6 pb-6"
              >
                {loading ? (
                  <p className="text-white/60 py-6">Loading items...</p>
                ) : (
                  <div className="space-y-4">
                    {items.map((i) => (
                      <div
                        key={i._id}
                        className="flex items-center gap-4 bg-[#1A1A1A] rounded-xl p-4 hover:bg-white/5 transition"
                      >
                        <Image
                          src={i.image}
                          alt={i.name}
                          width={90}
                          height={90}
                          className="rounded-xl object-cover"
                        />

                        <div className="flex-1">
                          <h3 className="font-bold text-white">{i.name}</h3>
                          <p className="text-sm text-white/60">
                            {i.description}
                          </p>
                          <p className="text-primary font-bold mt-1">
                            {i.discount ? (
                              // <div>
                              <>
                                <span className="line-through text-gray-400 mr-2">
                                  ₹{i.price}
                                </span>
                                <span className="text-green-400 font-semibold">
                                  ₹
                                  {Math.round(
                                    i.price - (i.price * i.discount) / 100
                                  )}
                                </span>
                                {/* </div> */}
                              </>
                            ) : (
                              <span>₹{i.price}</span>
                            )}
                          </p>
                        </div>

                        {/* ADD TO CART */}
                  
                        <div className="w-[130px] flex justify-end">
                          {inCart(i.name) ? (
                            <div className="flex items-center justify-between w-full h-10 px-2 rounded-full bg-[#0f0f0f] border border-primary shadow-inner">
                              <button
                                onClick={() => dispatch(decreaseQty(i.name))}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-black font-bold hover:scale-105 transition"
                              >
                                −
                              </button>

                              <span className="text-white font-semibold text-sm">
                                {inCart(i.name).qty}
                              </span>

                              <button
                                onClick={() => dispatch(increaseQty(i.name))}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-black font-bold hover:scale-105 transition"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                dispatch(
                                  addToCart({
                                    ...i,
                                    _id: i.name,
                                    price: i.discount
                                      ? Math.round(i.price - (i.price * i.discount) / 100)
                                      : i.price,
                                    originalPrice: i.price, 
                                  })
                                )
                              }
                              className="w-full h-10 rounded-full border border-primary text-primary text-sm font-semibold
                 hover:bg-primary hover:text-black transition-all"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
