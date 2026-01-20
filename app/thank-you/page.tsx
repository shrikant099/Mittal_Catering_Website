
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Placed Successfully | Mittal Catering",
  description: "Your order has been placed successfully with Mittal Catering. Track your order details and delivery status here.",
  robots: { index: true, follow: true },
};

async function getOrder(orderId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/order/${orderId}`, { cache: "no-store" });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;
  if (!orderId) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-[#121212] p-6 sm:p-8 rounded-2xl text-center shadow-xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Order not found</h1>
          <Link href="/menu" className="inline-block mt-6 bg-primary text-black px-6 py-3 rounded-xl font-bold">Back to Menu</Link>
        </div>
      </main>
    );
  }

  const order = await getOrder(orderId);
  if (!order) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-[#121212] p-6 sm:p-8 rounded-2xl text-center shadow-xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Order not found</h1>
          <Link href="/menu" className="inline-block mt-6 bg-primary text-black px-6 py-3 rounded-xl font-bold">Back to Menu</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-[#0f0f0f] px-3 sm:px-4 py-10 overflow-y-auto-[#0f0f0f] px-3 sm:px-4 py-10">
      <div className="max-w-4xl mx-auto bg-[#121212] rounded-2xl shadow-2xl p-4 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="mx-auto mb-4 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-3xl">✓</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-primary">Thank you for your order 🎉</h1>
          <p className="text-white/70 mt-2">Your meal will be delivered to your seat.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-10">
          <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
            <p className="text-white/50 text-xs">Order ID</p>
            <p className="text-white font-semibold break-all">{order.orderId}</p>
          </div>
          <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
            <p className="text-white/50 text-xs">Order Date</p>
            <p className="text-white font-semibold">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
                : "—"}
            </p>
          </div>
          <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
            <p className="text-white/50 text-xs">Status</p>
            <p className="text-green-600 font-semibold capitalize">{order.status}</p>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <section className="bg-[#1A1A1A] rounded-xl p-4 sm:p-5">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">Customer Details</h2>
            <ul className="text-white/80 space-y-1 text-sm sm:text-base">
              <li><b>Name:</b> {order.customer.fullName}</li>
              <li><b>Mobile:</b> {order.customer.mobileNumber}</li>
              <li><b>Train:</b> {order.customer.trainNumber}</li>
              <li><b>PNR:</b> {order.customer.pnr}</li>
              <li><b>Coach:</b> {order.customer.coach}</li>
              <li><b>Seat:</b> {order.customer.seat}</li>
              {order.customer.instructions && <li><b>Instructions:</b> {order.customer.instructions}</li>}
            </ul>
          </section>

          <section className="bg-[#1A1A1A] rounded-xl p-4 sm:p-5">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">Order Items</h2>
            <ul className="space-y-2">
              {order.items.map((i: any) => (
                <li key={i._id} className="flex justify-between text-white/90 text-sm sm:text-base">
                  <span className="truncate max-w-[70%]">{i.name} × {i.qty}</span>
                  <span>₹{i.price * i.qty}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 mt-4 pt-4 text-white/80 text-sm sm:text-base">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{order.subtotal}</span></div>
              <div className="flex justify-between"><span>GST (5%)</span><span>₹{order.gst}</span></div>
              <div className="flex justify-between font-extrabold text-primary"><span>Total</span><span>₹{order.total}</span></div>
            </div>
          </section>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link href="/menu" className="bg-primary text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-center">Order Again</Link>
          <Link href="/" className="border border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-center">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
