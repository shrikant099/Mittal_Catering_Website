"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCategory } from "@/features/category/categorySlice";
import toast from "react-hot-toast";
export default function DeleteCategoryModal({
  category,
  onClose,
}: {
  category: any;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function handleDelete() {
    setLoading(true);

    const res = await fetch(`/api/categories/${category._id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      dispatch(deleteCategory(category._id)); 
      onClose();
      toast.success("Category deleted successfully");
    } else {
      alert(data.message || "Delete failed");
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white text-black w-[420px] p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-3">Delete Category</h2>
        <p className="mb-6">
          Are you sure you want to delete <b>{category.name}</b>?
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 px-4 py-2 rounded text-white"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
