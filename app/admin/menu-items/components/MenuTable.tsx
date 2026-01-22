"use client";
import Image from "next/image";
import AddMenuModal from "./AddMenuModal";
import EditMenuModal from "./EditMenuModal";
import DeleteMenuModal from "./DeleteMenuModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateMenuStatus } from "@/features/menu/menuSlice";
import { toast } from "react-hot-toast";

export default function MenuTable() {
  const items = useSelector((s: any) => s.menu.list);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState<any | null>(null);
  const [del, setDel] = useState<any | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const dispatch = useDispatch();

  async function toggleStatus(item: any) {
    setLoadingId(item._id);

    const next = item.status === "active" ? "disabled" : "active";

    const res = await fetch(`/api/menu/${item._id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });

    const data = await res.json();

    if (data.success) {
      dispatch(updateMenuStatus({ id: item._id, status: data.data.status }));
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }

    setLoadingId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Menu Items</h1>
        <div className="space-x-3">
          <button
            onClick={() => setAdd(true)}
            className="bg-orange-500 cursor-pointer px-5 py-2 rounded font-semibold"
          >
            + Add Menu Item
          </button>
        </div>
      </div>

      <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg">
        <table className="w-full">
          <thead className="bg-[#2a2a2a]">
            <tr>
              <th className="p-4 text-left">Item</th>
              <th>Image</th>
              <th>Category</th>
              <th>Food Type</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i: any) => (
              <tr
                key={i._id}
                className="border-t border-white/10 hover:bg-white/5"
              >
                <td className="p-4 font-medium">{i.name}</td>
                <td>
                  <Image
                    src={i.image}
                    alt={i.name}
                    width={48}
                    height={48}
                    className="rounded"
                  />
                </td>
                <td>{i.category?.name || i.category}</td>
                <td>
                  <span className="px-3 py-1 rounded bg-green-500/20 text-green-400">
                    {i.foodType}
                  </span>
                </td>
                <td>
                  {i.discount ? (
                    <div>
                      <span className="line-through text-gray-400 mr-2">
                        ₹{i.price}
                      </span>
                      <span className="text-green-400 font-semibold">
                        ₹{Math.round(i.price - (i.price * i.discount) / 100)}
                      </span>
                    </div>
                  ) : (
                    <span>₹{i.price}</span>
                  )}
                </td>

                <td>
                  {i.discount ? (
                    <span className="px-2 py-1 bg-green-500/40 text-white font-bold">
                      {i.discount}% OFF
                    </span>
                  ) : (
                    "No Discount"
                  )}
                </td>
                <td>
                  <button
                    disabled={loadingId === i._id}
                    onClick={() => toggleStatus(i)}
                    className={`relative w-12 h-7 rounded-full transition ${
                      i.status === "active" ? "bg-blue-500" : "bg-gray-400"
                    } ${loadingId === i._id ? "opacity-50" : ""}`}
                  >
                    {loadingId === i._id ? (
                      <span className="absolute inset-0 flex items-center justify-center text-xs">
                        ...
                      </span>
                    ) : (
                      <span
                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition ${
                          i.status === "active" ? "translate-x-5" : ""
                        }`}
                      />
                    )}
                  </button>
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() => setEdit(i)}
                    className="bg-yellow-500 cursor-pointer px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDel(i)}
                    className="bg-red-500 cursor-pointer px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {add && <AddMenuModal onClose={() => setAdd(false)} />}
      {edit && <EditMenuModal item={edit} onClose={() => setEdit(null)} />}
      {del && <DeleteMenuModal item={del} onClose={() => setDel(null)} />}
    </div>
  );
}
