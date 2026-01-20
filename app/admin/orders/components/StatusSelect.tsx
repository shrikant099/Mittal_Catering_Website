"use client";
import toast from "react-hot-toast";

const statusColors: any = {
  Placed: "bg-purple-600/20 text-purple-400 border-purple-500",
  Confirm: "bg-blue-600/20 text-blue-400 border-blue-500",
  Dispatch: "bg-orange-500/20 text-orange-400 border-orange-500",
  Delivered: "bg-green-600/20 text-green-400 border-green-500",
  Cancel: "bg-red-600/20 text-red-400 border-red-500",
};

const payColors: any = {
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500",
  Paid: "bg-green-600/20 text-green-400 border-green-500",
  Failed: "bg-red-600/20 text-red-400 border-red-500",
};

export default function StatusSelect({ type, orderId, value, onChange }: any) {
  const list =
    type === "status"
      ? ["Placed", "Confirm", "Dispatch", "Delivered", "Cancel"]
      : ["Pending", "Paid", "Failed"];

  const colors = type === "status" ? statusColors : payColors;

  async function update(v: string) {
    const res = await fetch(`/api/order/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        type === "status" ? { status: v } : { paymentStatus: v }
      ),
    });

    if (res.ok) {
      toast.success(
        type === "status"
          ? `Order status updated to "${v}"`
          : `Payment status updated to "${v}"`
      );
      onChange();
    } else {
      toast.error("Failed to update status");
    }
  }

  return (
    <select
      value={value}
      onChange={(e) => update(e.target.value)}
      className={`px-4 py-2 rounded-xl text-xs font-bold border bg-black ${colors[value]} focus:outline-none cursor-pointer`}
    >
      {list.map((s) => (
        <option key={s} className="bg-black text-white">
          {s}
        </option>
      ))}
    </select>
  );
}
