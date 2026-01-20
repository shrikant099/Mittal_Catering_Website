"use client";
import { useState } from "react";
import toast from "react-hot-toast";
export function AddCategoryModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);

    const res = await fetch("/api/categories", { method: "POST", body: form });
    const data = await res.json();

    if (data.success) {
      toast.success("Category added successfully");
      window.location.reload();
    } else {
      alert(data.message);
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black w-[500px] p-6 rounded-xl"
      >
        <h2 className="text-2xl font-bold mb-4">Add Category</h2>
        <input
          name="name"
          placeholder="Category Title"
          required
          className="w-full border p-2 mb-4 rounded"
        />
        <input name="thumbnail" type="file" required className="mb-4" />
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-orange-500 px-4 py-2 rounded">
            {loading ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
