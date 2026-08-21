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

  // Only show categories that actually have items on the customer-facing
  // menu — an empty accordion is just clutter, not something to order from.
  const visibleCategories = categories.filter((c) => getItems(c._id).length > 0);

  if (visibleCategories.length === 0) {
    return (
      <p className="text-white/40 text-center py-16">
        Menu is being updated — please check back shortly.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {visibleCategories.map((c) => {
        const items = getItems(c._id);
        const isOpen = openIds.has(c._id);

        return (
          <motion.div
            key={c._id}
            layout
            className="bg-[#141414] border border-white/[0.06] rounded-2xl overflow-hidden shadow-sm"
          >
            {/* HEADER */}
            <button
              onClick={() => toggle(c._id)}
              className="w-full flex items-center gap-4 p-4 sm:p-5 text-left hover:bg-white/[0.03] transition"
            >
              <Image
                src={c.thumbnail}
                alt={c.name}
                width={60}
                height={60}
                className="rounded-xl object-cover w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] shrink-0 ring-1 ring-white/10"
              />

              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                  {c.name}
                </h2>
                <p className="text-xs sm:text-sm text-white/40 mt-0.5">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              </div>

              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                className="text-2xl text-primary shrink-0"
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
                  className="px-4 sm:px-6 pb-5 sm:pb-6 overflow-hidden"
                >
                  <div className="space-y-3">
                    {items.map((i: any) => (
                      <MenuItemRow
                        key={i._id}
                        item={i}
                        inCart={inCart}
                        dispatch={dispatch}
                      />
                    ))}
                  </div>
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
        bg-[#161616]
        rounded-2xl
        border border-white/[0.06]
        p-4 sm:p-5
        shadow-sm
        hover:border-white/10
        transition
      "
    >
      <div className="flex gap-3 sm:gap-4">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            width={90}
            height={90}
            className="rounded-xl object-cover w-[74px] h-[74px] sm:w-[90px] sm:h-[90px] shrink-0 ring-1 ring-white/10"
          />
        )}

        <div className="flex-1 min-w-0 py-0.5">
          <h3 className="font-bold text-white leading-snug">{item.name}</h3>
          {item.description && (
            <p className="text-sm text-white/45 mt-0.5">
              {item.description}
            </p>
          )}

          {!hasVariants && (
            <div className="flex items-center justify-between gap-3 mt-3">
              <p className="text-primary font-bold">
                {item.discount ? (
                  <>
                    <span className="line-through text-gray-500 mr-2 font-normal">
                      ₹{item.price}
                    </span>
                    <span className="text-green-400">
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

              <AddControl
                inCartEntry={inCart(item.name)}
                onAdd={() =>
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
                onIncrease={() => dispatch(increaseQty(item.name))}
                onDecrease={() => dispatch(decreaseQty(item.name))}
              />
            </div>
          )}
        </div>
      </div>

      {hasVariants && (
        <div className="mt-4 rounded-xl overflow-hidden border border-white/[0.06] divide-y divide-white/[0.06] bg-black/15">
          {item.variants.map((v: any) => {
            const variantId = `${item.name} (${v.label})`;
            const finalPrice = v.discount
              ? Math.round(v.price - (v.price * v.discount) / 100)
              : v.price;

            return (
              <div
                key={v._id || v.label}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-white/[0.03] transition"
              >
                <div>
                  <p className="text-sm text-white/85 font-medium">
                    {v.label}
                  </p>
                  <p className="text-primary font-bold text-sm mt-0.5">
                    {v.discount ? (
                      <>
                        <span className="line-through text-gray-500 mr-1.5 font-normal">
                          ₹{v.price}
                        </span>
                        <span className="text-green-400">₹{finalPrice}</span>
                      </>
                    ) : (
                      <>₹{v.price}</>
                    )}
                  </p>
                </div>

                <AddControl
                  inCartEntry={inCart(variantId)}
                  onAdd={() =>
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
                  onIncrease={() => dispatch(increaseQty(variantId))}
                  onDecrease={() => dispatch(decreaseQty(variantId))}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AddControl({
  inCartEntry,
  onAdd,
  onIncrease,
  onDecrease,
}: {
  inCartEntry: any;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  if (inCartEntry) {
    return (
      <div className="flex items-center gap-3 bg-primary rounded-full px-1 h-9 shadow-sm shrink-0">
        <button
          onClick={onDecrease}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-white/90 text-primary font-bold hover:bg-white transition"
        >
          −
        </button>
        <span className="text-white text-sm font-bold w-4 text-center">
          {inCartEntry.qty}
        </span>
        <button
          onClick={onIncrease}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-white/90 text-primary font-bold hover:bg-white transition"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onAdd}
      className="h-9 px-6 shrink-0 rounded-full bg-white text-primary text-xs font-bold uppercase tracking-wide shadow-sm border border-primary/25 hover:bg-primary hover:text-white hover:border-primary transition-all"
    >
      Add
    </button>
  );
}
