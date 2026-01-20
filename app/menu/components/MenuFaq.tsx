"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { addToCart } from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryItems } from "@/features/menuPublic/menuSlicePublic";

export default function MenuFaq({ categories }: { categories: any[] }) {
  const itemsByCategory = useSelector((s: any) => s.menuPublic.itemsByCategory);

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
                            ₹{i.price}
                          </p>
                        </div>

                        <button
                          onClick={() => dispatch(addToCart(i))}
                          className="
                            border border-primary text-primary
                            px-5 py-2 rounded-lg
                            hover:bg-primary hover:text-black
                            transition font-semibold
                          "
                        >
                          Add
                        </button>
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
