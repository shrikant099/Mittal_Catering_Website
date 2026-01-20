// components/admin/menu/AddMenuModal.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addMenuItem } from "@/features/menu/menuSlice";
import { toast } from "react-hot-toast";
export default function AddMenuModal({ onClose }: { onClose: () => void }) {
  const dispatch = useDispatch();
  const categories = useSelector((s: any) => s.category.list);

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function onFile(e: any) {
    const f = e.target.files?.[0];
    if (!f) return;
    setPreview(URL.createObjectURL(f));
  }

  async function submit(e: any) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);

    const res = await fetch("/api/menu", { method: "POST", body: form });
    const data = await res.json();

    if (data.success) {
      dispatch(addMenuItem(data.data));
      onClose();
      toast.success("Menu item added successfully");
    } else alert(data.message || "Failed to create menu item");

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-white text-black w-[900px] max-w-[95%] rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Add Menu Item</h2>
          <button type="button" onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm mb-1">Item Name *</label>
            <input name="name" required className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-sm mb-1">Select Category *</label>
            <select
              name="category"
              required
              className="w-full border rounded p-2"
            >
              <option value="">Select Category</option>
              {categories.map((c: any) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Price *</label>
            <input
              name="price"
              type="number"
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Discount (%)</label>
            <input
              name="discount"
              type="number"
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Food Type *</label>
            <select
              name="foodType"
              required
              className="w-full border rounded p-2"
            >
              <option value="veg">Vegetarian</option>
              <option value="non_veg">Non Vegetarian</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Status</label>
            <select name="status" className="w-full border rounded p-2">
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm mb-1">Description *</label>
            <textarea
              name="description"
              required
              className="w-full border rounded p-2 h-28"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Image *</label>
            <div className="border rounded-lg p-4 flex items-center gap-4">
              {preview ? (
                <Image
                  src={preview}
                  alt="preview"
                  width={120}
                  height={120}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-[120px] h-[120px] border-2 border-dashed rounded-lg flex items-center justify-center text-sm text-gray-400">
                  Preview
                </div>
              )}
              <input name="image" type="file" required onChange={onFile} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border rounded"
          >
            Cancel
          </button>
          <button className="bg-orange-500 px-6 py-2 rounded text-white font-semibold">
            {loading ? "Saving..." : "Save Item"}
          </button>
        </div>
      </form>
    </div>
  );
}
