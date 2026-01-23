// app/checkout/components/CheckoutClient.tsx (CLIENT COMPONENT)
"use client";

import React, { useMemo, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, increaseQty, decreaseQty } from "@/features/cart/cartSlice";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutClient() {
  const { items } = useSelector((s: any) => s.cart);
  const dispatch = useDispatch();
  // Math Calculation For Billing
  const originalSubtotal = useMemo(
    () =>
      items.reduce(
        (a: number, i: any) => a + (i.originalPrice || i.price) * i.qty,
        0
      ),
    [items]
  );

  const discountedSubtotal = useMemo(
    () => items.reduce((a: number, i: any) => a + i.price * i.qty, 0),
    [items]
  );

  const totalOriginal = useMemo(
    () =>
      items.reduce(
        (a: number, i: any) => a + (i.originalPrice || i.price) * i.qty,
        0
      ),
    [items]
  );

  const totalSaved = useMemo(
    () => Math.max(0, originalSubtotal - discountedSubtotal),
    [originalSubtotal, discountedSubtotal]
  );

  const gst = useMemo(
    () => +(discountedSubtotal * 0.05).toFixed(2),
    [discountedSubtotal]
  );

  const total = useMemo(
    () => +(discountedSubtotal + gst).toFixed(2),
    [discountedSubtotal, gst]
  );
  const subtotal = useMemo(
    () => items.reduce((a: any, i: any) => a + i.price * i.qty, 0),
    [items]
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    train: "",
    pnr: "",
    coach: "",
    seat: "",
    instructions: "",
  });
  const [showPayment, setShowPayment] = useState(false);

  // Input rules & sanitization
  const onChange = useCallback((e: any) => {
    const { name, value } = e.target;
    const rules: any = {
      name: (v: string) => v.replace(/[^a-zA-Z\s]/g, "").slice(0, 40), // only letters
      phone: (v: string) => v.replace(/\D/g, "").slice(0, 10), // 10 digits
      train: (v: string) => v.replace(/\D/g, "").slice(0, 5), // 5 digits
      pnr: (v: string) => v.replace(/\D/g, "").slice(0, 10), // 10 digits
      coach: (v: string) => v.replace(/[^a-zA-Z0-9]/g, "").slice(0, 3), // alphanumeric
      seat: (v: string) => Number(v.replace(/\D/g, "").slice(0, 6)),
      instructions: (v: string) => v.slice(0, 150),
    };
    const next = rules[name] ? rules[name](value) : value;
    setForm((f: any) => ({ ...f, [name]: next }));
  }, []);

  const [loading, setLoading] = useState(false);
  const payCOD = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            fullName: form.name,
            mobileNumber: form.phone,
            trainNumber: form.train,
            pnr: form.pnr,
            coach: form.coach,
            seat: form.seat,
            instructions: form.instructions,
          },
          items,
          subtotal,
          gst,
          total,
          paymentMethod: "COD",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Order failed");
      dispatch(clearCart());
      window.location.href = `/thank-you?orderId=${data.data.orderId}`;
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [form, items, subtotal, gst, total, dispatch]);

  const payRazorpay = useCallback(() => {
    alert("Razorpay selected. Next: open Razorpay flow.");
  }, []);

  // Strict validation for enabling Place Order
  const isFormValid =
    /^[A-Za-z\s]{2,}$/.test(form.name) &&
    /^\d{10}$/.test(form.phone) &&
    /^\d{5}$/.test(form.train) &&
    /^\d{10}$/.test(form.pnr) &&
    form.coach.length > 0 &&
    Number(form.seat) > 0 &&
    items.length > 0;

  return (
    <>
      <button className="back-button fixed font-bold top-10 left-5 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:shadow-xl">
        <Link href={"/menu"}>Back To Menu</Link>
      </button>

      <main className="min-h-screen mt-20 bg-background py-10">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
          {/* LEFT: CART */}
          <section className="bg-[#121212] rounded-2xl p-6 shadow-xl">
            <h1 className="text-2xl font-extrabold text-white mb-4">
              Your Cart
            </h1>
            {items.length === 0 ? (
              <p className="text-white/60">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {items.map((i: any) => (
                  <div
                    key={i._id}
                    className="flex gap-4 items-center bg-[#1A1A1A] rounded-xl p-4"
                  >
                    <Image
                      src={i.image}
                      alt={i.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-white text-sm sm:text-md md:text-lg font-semibold">{i.name}</h3>
                      <p className="text-white/60 text-sm">₹{i.price}</p>
                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() => dispatch(decreaseQty(i._id))}
                          className="w-6 h-6 bg-primary rounded-full"
                        >
                          −
                        </button>
                        <span className="text-white font-bold">{i.qty}</span>
                        <button
                          onClick={() => dispatch(increaseQty(i._id))}
                          className="w-6 h-6 bg-primary rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-primary font-bold">₹{i.price * i.qty}</p>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal</span>
                    <span>₹{originalSubtotal}</span>
                  </div>

                  {totalSaved > 0 && (
                    <div className="flex justify-between text-green-400 font-semibold">
                      <span>Discount</span>
                      <span>-₹{totalSaved}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-white/80">
                    <span>GST (5%)</span>
                    <span>₹{gst}</span>
                  </div>

                  <div className="flex justify-between text-white font-extrabold text-lg pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(clearCart())}
                  className="mt-4 w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </section>

          {/* RIGHT: FORM */}
          <section className="bg-[#121212] rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-extrabold text-white mb-4">
              Passenger Details
            </h2>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                e.preventDefault()
              }
              className="grid sm:grid-cols-2 gap-4"
            >
              <Input
                label="Full Name"
                name="name"
                value={form.name}
                onChange={onChange}
                required
                placeholder="Full name"
              />
              <Input
                label="Mobile Number"
                name="phone"
                value={form.phone}
                onChange={onChange}
                required
                inputMode="numeric"
                pattern="[0-9]{10}"
                placeholder="Mobile number"
              />
              <Input
                label="Train Number"
                name="train"
                value={form.train}
                onChange={onChange}
                required
                inputMode="numeric"
                pattern="[0-9]{5}"
                placeholder="Train number"
              />
              <Input
                label="PNR Number"
                name="pnr"
                value={form.pnr}
                onChange={onChange}
                required
                inputMode="numeric"
                pattern="[0-9]{10}"
                placeholder="Pnr number"
              />
              <Input
                label="Coach"
                name="coach"
                value={form.coach}
                onChange={onChange}
              />
              <Input
                label="Seat"
                name="seat"
                value={form.seat}
                onChange={onChange}
              />
              <div className="sm:col-span-2">
                <label className="text-white/80 text-sm">
                  Optional Instructions (Max 150 characters)
                </label>
                <textarea
                  name="instructions"
                  maxLength={150}
                  value={form.instructions}
                  onChange={onChange}
                  className="w-full mt-1 bg-[#1A1A1A] text-white rounded-lg p-3"
                />
                <p className="text-white/40 text-xs mt-1">
                  {form.instructions.length}/150 characters
                </p>
              </div>
              <button
                type="button"
                disabled={!isFormValid}
                onClick={() => setShowPayment(true)}
                className={`sm:col-span-2 font-bold py-4 rounded-xl transition ${
                  isFormValid
                    ? "bg-primary text-black hover:opacity-90"
                    : "bg-gray-500/40 text-white/50 cursor-not-allowed"
                }`}
              >
                Place Order
              </button>

              {/* PAYMENT MODAL */}
              {showPayment && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
                  <div className="bg-[#121212] rounded-2xl p-6 w-full max-w-md shadow-2xl">
                    <h3 className="text-2xl font-extrabold text-white mb-4 text-center">
                      Choose Payment Method
                    </h3>
                    <div className="space-y-4">
                      <button
                        onClick={payCOD}
                        className="w-full bg-[#212121] cursor-pointer font-bold text-white py-4 rounded-xl font-bold hover:opacity-90"
                      >
                        Cash On Delivery
                      </button>
                      <button
                        onClick={payRazorpay}
                        className="w-full bg-primary font-bold cursor-pointer text-black py-4 rounded-xl hover:opacity-90"
                      >
                        Pay Online (Razorpay)
                      </button>
                      <button
                        onClick={() => setShowPayment(false)}
                        className="w-full border cursor-pointer border-white/20 text-white py-3 rounded-xl"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </section>
        </div>
      </main>
    </>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-white/80 text-sm">{label}</label>
      <input
        {...props}
        className="w-full mt-1 bg-[#1A1A1A] text-white rounded-lg p-3"
      />
    </div>
  );
}
