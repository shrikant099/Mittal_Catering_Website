"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { deleteCategory } from "@/features/category/categorySlice";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

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

    try {
      const res = await fetch(`/api/categories/${category._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        dispatch(deleteCategory(category._id));
        toast.success("Category deleted successfully");
        onClose();
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black w-full max-w-[420px] p-6 sm:p-7 rounded-2xl shadow-2xl"
      >
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center mb-4">
          <Trash2 size={22} />
        </div>

        <h2 className="text-xl font-bold mb-2">Delete Category</h2>
        <p className="text-gray-500 mb-6">
          Are you sure you want to delete <b className="text-black">{category.name}</b>?
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 px-5 py-2.5 rounded-lg text-white font-semibold hover:bg-red-600 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
