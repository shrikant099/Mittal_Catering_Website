"use client";
import { useEffect, useState, useRef } from "react";
import StatusSelect from "./StatusSelect";
import { MoreVertical, MessageCircle, Trash2 } from "lucide-react";

export default function OrdersTable() {
  const [orders, setOrders] = useState<any[]>([]);
  const [openAction, setOpenAction] = useState<string | null>(null);
  const actionRef = useRef<HTMLDivElement | null>(null);

  async function loadOrders() {
    const res = await fetch("/api/order");
    const json = await res.json();
    setOrders(json.data || []);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    if (!openAction) return;

    const handler = () => setOpenAction(null);
    document.addEventListener("click", handler);

    return () => document.removeEventListener("click", handler);
  }, [openAction]);

  const sendWhatsApp = (o: any) => {
    const items = o.items.map((i: any) => `• ${i.name} × ${i.qty}`).join("\n");

    const arrival = new Date(o.createdAt || Date.now()).toLocaleString(
      "en-IN",
      { dateStyle: "medium", timeStyle: "short" }
    );

    const discount = o.discount || 0;
    const finalAmount = o.total;

    const message = `
  New Order Notification
  
  Order Details:
  * Order ID: ${o.orderId}
  * Name: ${o.customer.fullName}
  * Mobile Number: ${o.customer.mobileNumber}
  * Payment Type: ${o.paymentMethod}
  * Train: ${o.customer.trainNumber}
  * Coach & Seat: ${o.customer.coach}/${o.customer.seat}
  * Arrival Date: ${arrival}
  
  Menu Items:
  ${items}
  
  Order Total: ₹${o.subtotal}
  Discount: ₹${discount}
  GST (5%): ₹${o.gst}
  
  Final Amount: ₹${finalAmount}
  Amount to Collect: ₹${finalAmount}
  
  Customer Note: ${o.customer.instructions || "Provide salt with food"}
    `.trim();

    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/91${o.customer.mobileNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Delete this order?")) return;
    await fetch(`/api/order/${orderId}`, { method: "DELETE" });
    loadOrders();
  };

  return (
    <div className="bg-gradient-to-br from-[#111] to-[#0b0b0b] rounded-2xl p-4 md:p-6 shadow-2xl border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-extrabold text-white">
          Orders Management
        </h2>
        <span className="text-white/50 text-xs md:text-sm">
          Live status updates • Auto-saved
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-[1024px] w-full text-white text-sm table-fixed">
          <colgroup>
            <col className="w-[170px]" />
            <col className="w-[260px]" />
            <col className="w-[220px]" />
            <col className="w-[200px]" />
            <col className="w-[140px]" />
            <col className="w-[140px]" />
            <col className="w-[110px]" />
            <col className="w-[90px]" />
          </colgroup>
          <thead className="bg-white/5 sticky top-0">
            <tr className="text-left">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3 hidden lg:table-cell">Items</th>
              <th className="p-3 hidden md:table-cell">Bill Summary</th>
              <th className="p-3">Status</th>
              <th className="p-3 hidden sm:table-cell">Payment</th>
              <th className="p-3 hidden md:table-cell">Method</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr
                key={o._id}
                className="border-t border-white/10 hover:bg-white/5 transition align-top"
              >
                <td className="p-3 font-mono text-xs text-white/80 break-all">
                  {o.orderId}
                </td>

                <td className="p-3">
                  <div className="space-y-1">
                    <p className="font-semibold leading-tight">
                      {o.customer.fullName}
                    </p>
                    <p className="text-white/50 text-xs">
                      {o.customer.mobileNumber}
                    </p>
                    <div className="mt-2 grid grid-cols-2 xl:grid-cols-4 gap-2 text-[11px] text-white/80 bg-white/5 rounded-xl p-2">
                      <div className="flex justify-between gap-2">
                        <span>Train</span>
                        <span className="font-mono">
                          {o.customer.trainNumber}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span>PNR</span>
                        <span className="font-mono truncate">
                          {o.customer.pnr}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span>Coach</span>
                        <span className="font-mono">{o.customer.coach}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span>Seat</span>
                        <span className="font-mono">{o.customer.seat}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="p-3 hidden lg:table-cell">
                  <ul className="space-y-1 text-white/80">
                    {o.items.map((i: any) => (
                      <li key={i._id} className="truncate">
                        {i.name} × {i.qty}
                      </li>
                    ))}
                  </ul>
                </td>

                <td className="p-3 hidden md:table-cell">
                  <div className="bg-white/5 rounded-xl p-3 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{o.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (5%)</span>
                      <span>₹{o.gst}</span>
                    </div>
                    <div className="flex justify-between font-bold text-primary text-sm">
                      <span>Total</span>
                      <span>₹{o.total}</span>
                    </div>
                  </div>
                </td>

                <td className="p-3">
                  <StatusSelect
                    type="status"
                    orderId={o.orderId}
                    value={o.status}
                    onChange={loadOrders}
                  />
                </td>

                <td className="p-3 hidden sm:table-cell">
                  <StatusSelect
                    type="payment"
                    orderId={o.orderId}
                    value={o.paymentStatus}
                    onChange={loadOrders}
                  />
                </td>

                <td className="p-3 hidden md:table-cell">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold whitespace-nowrap">
                    {o.paymentMethod}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3 relative" ref={actionRef as any}>
                  <button
                    onClick={() =>
                      setOpenAction(openAction === o._id ? null : o._id)
                    }
                    className="p-2 rounded-lg hover:bg-white/10 transition"
                    aria-label="Actions"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openAction === o._id && (
                    <div className="absolute right-2 top-10 z-20 w-44 bg-[#0f0f0f] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                      <button
                        onClick={() => sendWhatsApp(o)}
                        className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5"
                      >
                        <MessageCircle size={16} /> Send WhatsApp
                      </button>
                      <button
                        onClick={() => deleteOrder(o.orderId)}
                        className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={16} /> Delete Order
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
