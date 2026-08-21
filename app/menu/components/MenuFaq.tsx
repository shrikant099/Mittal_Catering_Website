"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { addToCart, decreaseQty, increaseQty } from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { hydrateItemsByCategory } from "@/features/menuPublic/menuSlicePublic";

export default function MenuFaq({
  categories,
  itemsByCategory,
}: {
  categories: any[];
  itemsByCategory: Record<string, any[]>;
}) {
  const cachedItemsByCategory = useSelector(
    (s: any) => s.menuPublic.itemsByCategory
  );
  const cartItems = useSelector((s: any) => s.cart?.items);
  const cart = Array.isArray(cartItems) ? cartItems : [];
  const dispatch = useDispatch();

  const inCart = (id: string) =>
    cart.find((i: { _id: string }) => i._id === id);

  // Menu is fetched once on the server (see app/menu/page.tsx) and pushed
  // into redux here so it stays available/cached across navigations.
  useEffect(() => {
    dispatch(hydrateItemsByCategory(itemsByCategory));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // All categories start expanded — no click needed to see items.
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(categories.map((c) => c._id))
  );

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const getItems = (id: string) =>
    cachedItemsByCategory[id] ?? itemsByCategory[id] ?? [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {categories.map((c) => {
        const items = getItems(c._id);
        const isOpen = openIds.has(c._id);

        return (
          <motion.div
            key={c._id}
            layout
            className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-lg"
          >
            {/* HEADER */}
            <button
              onClick={() => toggle(c._id)}
              className="w-full flex items-center gap-5 p-5 text-left hover:bg-white/5 transition"
            >
              <Image
                src={c.thumbnail}
                alt={c.name}
                width={70}
                height={70}
                className="rounded-xl object-cover w-[70px] h-[70px]"
              />

              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">{c.name}</h2>
                <p className="text-sm text-white/50">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              </div>

              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                className="text-3xl text-primary"
              >
                ⌄
              </motion.span>
            </button>

            {/* BODY */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="px-6 pb-6 overflow-hidden"
                >
                  {items.length === 0 ? (
                    <p className="text-white/40 text-sm text-center py-6">
                      No items in this category yet.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {items.map((i: any) => (
                        <MenuItemRow
                          key={i._id}
                          item={i}
                          inCart={inCart}
                          dispatch={dispatch}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

function MenuItemRow({
  item,
  inCart,
  dispatch,
}: {
  item: any;
  inCart: (id: string) => any;
  dispatch: any;
}) {
  const hasVariants = item.variants?.length > 0;

  return (
    <div
      className="
        flex flex-col sm:flex-row
        sm:items-start
        gap-3 sm:gap-4
        bg-[#1A1A1A]
        rounded-xl
        p-4
        hover:bg-white/5
        transition
      "
    >
      <Image
        src={item.image}
        alt={item.name}
        width={90}
        height={90}
        className="rounded-xl object-cover self-start sm:self-auto"
      />

      <div className="flex-1 py-1 w-full">
        <h3 className="font-bold text-white">{item.name}</h3>
        <p className="text-sm text-white/60">{item.description}</p>

        {!hasVariants && (
          <p className="text-primary font-bold mt-1">
            {item.discount ? (
              <>
                <span className="line-through text-gray-400 mr-2">
                  ₹{item.price}
                </span>
                <span className="text-green-400 font-semibold">
                  ₹
                  {Math.round(
                    item.price - (item.price * item.discount) / 100
                  )}
                </span>
              </>
            ) : (
              <span>₹{item.price}</span>
            )}
          </p>
        )}

        {hasVariants && (
          <div className="mt-3 space-y-2">
            {item.variants.map((v: any) => {
              const variantId = `${item.name} (${v.label})`;
              const finalPrice = v.discount
                ? Math.round(v.price - (v.price * v.discount) / 100)
                : v.price;
              const cartEntry = inCart(variantId);

              return (
                <div
                  key={v._id || v.label}
                  className="flex items-center justify-between gap-3 bg-[#0f0f0f] rounded-lg px-3 py-2"
                >
                  <div>
                    <p className="text-sm text-white/80">{v.label}</p>
                    <p className="text-primary font-semibold text-sm">
                      {v.discount ? (
                        <>
                          <span className="line-through text-gray-500 mr-1.5">
                            ₹{v.price}
                          </span>
                          <span className="text-green-400">
                            ₹{finalPrice}
                          </span>
                        </>
                      ) : (
                        <>₹{v.price}</>
                      )}
                    </p>
                  </div>

                  {cartEntry ? (
                    <div className="flex items-center gap-2 bg-black/40 border border-primary rounded-full px-2 h-9">
                      <button
                        onClick={() => dispatch(decreaseQty(variantId))}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-black font-bold hover:scale-105 transition"
                      >
                        −
                      </button>
                      <span className="text-white text-sm font-semibold w-4 text-center">
                        {cartEntry.qty}
                      </span>
                      <button
                        onClick={() => dispatch(increaseQty(variantId))}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-black font-bold hover:scale-105 transition"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        dispatch(
                          addToCart({
                            _id: variantId,
                            name: `${item.name} (${v.label})`,
                            image: item.image,
                            price: finalPrice,
                            originalPrice: v.price,
                          })
                        )
                      }
                      className="h-9 px-4 rounded-full border border-primary text-primary text-xs font-semibold hover:bg-primary hover:text-black transition-all"
                    >
                      Add
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SIMPLE-ITEM ADD TO CART */}
      {!hasVariants && (
        <div className="w-full sm:w-[130px] flex justify-end sm:justify-end">
          {inCart(item.name) ? (
            <div className="flex items-center justify-between w-full h-10 px-2 rounded-full bg-[#0f0f0f] border border-primary shadow-inner">
              <button
                onClick={() => dispatch(decreaseQty(item.name))}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-black font-bold hover:scale-105 transition"
              >
                −
              </button>

              <span className="text-white font-semibold text-sm">
                {inCart(item.name).qty}
              </span>

              <button
                onClick={() => dispatch(increaseQty(item.name))}
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
                    ...item,
                    _id: item.name,
                    price: item.discount
                      ? Math.round(
                          item.price - (item.price * item.discount) / 100
                        )
                      : item.price,
                    originalPrice: item.price,
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
      )}
    </div>
  );
}
