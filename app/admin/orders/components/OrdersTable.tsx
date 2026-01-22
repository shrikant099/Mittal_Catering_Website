"use client";
import { useEffect, useState, useRef } from "react";
import StatusSelect from "./StatusSelect";
import { MoreVertical, MessageCircle, Trash2, PencilLine } from "lucide-react";
import toast from "react-hot-toast";

export default function OrdersTable() {
  const [orders, setOrders] = useState<any[]>([]);
  const [openAction, setOpenAction] = useState<string | null>(null);
  const actionRef = useRef<HTMLDivElement | null>(null);
  const [editOrder, setEditOrder] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  async function loadOrders() {
    const res = await fetch("/api/order");
    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
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
    toast.success("Order deleted");
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
                  <div className="space-y-2">
                    {/* Name */}
                    <p className="font-semibold text-white leading-tight">
                      {o.customer.fullName}
                    </p>

                    {/* Mobile */}
                    <p className="text-white/50 text-xs">
                      {o.customer.mobileNumber}
                    </p>

                    {/* Train / Seat / PNR / Coach */}
                    <div
                      className="
        mt-3
        grid grid-cols-2
        gap-x-6 gap-y-2
        text-[12px]
        text-white/80
        bg-white/5
        rounded-xl
        p-3
        min-h-[90px]
      "
                    >
                      <div className="flex justify-between">
                        <span className="opacity-70">Train No</span>
                        <span className="font-mono">
                          {o.customer.trainNumber}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="opacity-70">Seat</span>
                        <span className="font-mono">{o.customer.seat}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="opacity-70">PNR &nbsp;</span>
                        <span className="font-mono truncate max-w-[110px]">
                          {o.customer.pnr}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="opacity-70">Coach</span>
                        <span className="font-mono">{o.customer.coach}</span>
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
                    <div className="absolute right-2 top-10 z-20 w-48 bg-[#0f0f0f] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                      <button
                        onClick={() => {
                          setEditOrder(o);
                          setOpenAction(null);
                        }}
                        className="
    w-full flex items-center gap-3
    px-4 py-3 text-sm font-medium
    text-blue-400
    hover:bg-blue-500/10
    transition
  "
                      >
                        <PencilLine size={16} className="text-blue-400" />
                        Edit Order
                      </button>

                      <button
                        onClick={() => sendWhatsApp(o)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5"
                      >
                        <MessageCircle size={16} /> Send WhatsApp
                      </button>

                      <button
                        onClick={() => deleteOrder(o.orderId)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
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

      {/* Edit Order PopUp */}
      {editOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-[#121212] w-full max-w-2xl rounded-2xl p-6 shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-white">Edit Order</h3>
              <button
                onClick={() => setEditOrder(null)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* FORM */}
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <Field
                label="Passenger Name"
                value={editOrder.customer.fullName}
                onChange={(e: any) =>
                  setEditOrder({
                    ...editOrder,
                    customer: {
                      ...editOrder.customer,
                      fullName: e.target.value,
                    },
                  })
                }
              />

              <Field
                label="Mobile Number"
                value={editOrder.customer.mobileNumber}
                onChange={(e: any) =>
                  setEditOrder({
                    ...editOrder,
                    customer: {
                      ...editOrder.customer,
                      mobileNumber: e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10),
                    },
                  })
                }
              />

              <Field
                label="Train Number"
                value={editOrder.customer.trainNumber}
                onChange={(e: any) =>
                  setEditOrder({
                    ...editOrder,
                    customer: {
                      ...editOrder.customer,
                      trainNumber: e.target.value,
                    },
                  })
                }
              />

              <Field
                label="PNR Number"
                value={editOrder.customer.pnr}
                onChange={(e: any) =>
                  setEditOrder({
                    ...editOrder,
                    customer: { ...editOrder.customer, pnr: e.target.value },
                  })
                }
              />

              <Field
                label="Coach"
                value={editOrder.customer.coach}
                onChange={(e: any) =>
                  setEditOrder({
                    ...editOrder,
                    customer: { ...editOrder.customer, coach: e.target.value },
                  })
                }
              />

              <Field
                label="Seat"
                value={editOrder.customer.seat}
                onChange={(e: any) =>
                  setEditOrder({
                    ...editOrder,
                    customer: {
                      ...editOrder.customer,
                      seat: e.target.value.replace(/\D/g, ""),
                    },
                  })
                }
              />

              {/* STATUS */}
              <div>
                <label className="text-white/70 text-xs mb-1 block">
                  Order Status
                </label>

                <select
                  value={editOrder.status}
                  onChange={(e) =>
                    setEditOrder({
                      ...editOrder,
                      status: e.target.value,
                    })
                  }
                  className="
      w-full bg-[#1A1A1A] text-white rounded-lg p-3
      outline-none focus:ring-2 focus:ring-primary
    "
                >
                  <option value="Placed">Placed</option>
                  <option value="Confirm">Confirm</option>
                  <option value="Dispatch">Dispatch</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancel">Cancel</option>
                </select>
              </div>

              {/* Payment Status */}
              <div>
                <label className="text-white/70">Payment Status</label>
                <select
                  value={editOrder.paymentStatus}
                  onChange={(e) =>
                    setEditOrder({
                      ...editOrder,
                      paymentStatus: e.target.value,
                    })
                  }
                  className="w-full mt-1 bg-[#1A1A1A] text-white p-3 rounded-lg"
                >
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Failed</option>
                </select>
              </div>

              {/* Payment Method */}
              <div>
                <label className="text-white/70 text-xs mb-1 block">
                  Payment Method
                </label>

                <select
                  value={editOrder.paymentMethod}
                  onChange={(e) =>
                    setEditOrder({
                      ...editOrder,
                      paymentMethod: e.target.value,
                    })
                  }
                  className="
      w-full bg-[#1A1A1A] text-white rounded-lg p-3
      outline-none focus:ring-2 focus:ring-primary
    "
                >
                  <option value="COD">Cash On Delivery</option>
                  <option value="ONLINE">Online</option>
                </select>
              </div>

              {/* Order Items */}
              {/* <div className="sm:col-span-2 mt-4">
  <h4 className="text-white font-semibold mb-3">Order Items</h4>

  <div className="space-y-3">
    {editOrder.items.map((item: any, idx: number) => (
      <div
        key={item._id}
        className="flex items-center justify-between bg-[#1A1A1A] p-3 rounded-xl"
      >
        <div>
          <p className="text-white font-medium">{item.name}</p>
          <p className="text-white/50 text-xs">₹{item.price} each</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const items = [...editOrder.items];
              if (items[idx].qty > 1) items[idx].qty -= 1;
              setEditOrder({ ...editOrder, items });
            }}
            className="w-8 h-8 rounded-full bg-white/10 text-white"
          >
            −
          </button>

          <span className="text-white font-bold w-6 text-center">
            {item.qty}
          </span>

          <button
            onClick={() => {
              const items = [...editOrder.items];
              items[idx].qty += 1;
              setEditOrder({ ...editOrder, items });
            }}
            className="w-8 h-8 rounded-full bg-primary text-black"
          >
            +
          </button>
        </div>
      </div>
    ))}
  </div>
</div> */}


              {/* NOTES */}
              <div className="sm:col-span-2">
                <label className="text-white/70">Instructions</label>
                <textarea
                  value={editOrder.customer.instructions || ""}
                  onChange={(e) =>
                    setEditOrder({
                      ...editOrder,
                      customer: {
                        ...editOrder.customer,
                        instructions: e.target.value,
                      },
                    })
                  }
                  className="w-full mt-1 bg-[#1A1A1A] text-white p-3 rounded-lg h-24"
                />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditOrder(null)}
                className="px-5 cursor-pointer py-2 rounded-lg border border-white/20 text-white"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  try {
                    setSaving(true);

                    const res = await fetch(`/api/order/${editOrder.orderId}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        customer: {
                          fullName: editOrder.customer.fullName,
                          mobileNumber: editOrder.customer.mobileNumber,
                          trainNumber: editOrder.customer.trainNumber,
                          pnr: editOrder.customer.pnr,
                          coach: editOrder.customer.coach,
                          seat: editOrder.customer.seat,
                          instructions: editOrder.customer.instructions,
                        },
                        status: editOrder.status,
                        paymentStatus: editOrder.paymentStatus,
                        paymentMethod: editOrder.paymentMethod,
                      }),
                    });

                    const data = await res.json();

                    if (!res.ok) {
                      throw new Error(data.message || "Update failed");
                    }

                    toast.success("Order updated successfully");
                    setEditOrder(null);
                    loadOrders();
                  } catch (err: any) {
                    toast.error(err.message || "Something went wrong");
                  } finally {
                    setSaving(false);
                  }
                }}
                className="px-6 py-2 cursor-pointer rounded-lg bg-primary text-black font-bold"
              >
                {saving ? "Saving..." : "Update Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, ...props }: { label: string; [key: string]: any }) {
  return (
    <div>
      <label className="text-white/70 text-xs mb-1 block">{label}</label>
      <input
        {...props}
        className="w-full bg-[#1A1A1A] text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
