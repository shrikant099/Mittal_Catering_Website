// components/admin/categories/EditCategoryModal.tsx
"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ImagePlus, X } from "lucide-react";
import { updateCategory } from "@/features/category/categorySlice";
import {
  ALLOWED_IMAGE_ACCEPT,
  ALLOWED_IMAGE_MESSAGE,
  isAllowedImageType,
} from "@/lib/imageValidation";

export default function EditCategoryModal({
  category,
  onClose,
}: {
  category: any;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(category.name);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(category.thumbnail);
  const [loading, setLoading] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!isAllowedImageType(f)) {
      toast.error(ALLOWED_IMAGE_MESSAGE);
      e.target.value = "";
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (file && !isAllowedImageType(file)) {
      toast.error(ALLOWED_IMAGE_MESSAGE);
      return;
    }

    const form = new FormData();
    form.append("name", name);
    if (file) form.append("thumbnail", file);

    setLoading(true);
    try {
      const res = await fetch(`/api/categories/${category._id}`, {
        method: "PUT",
        body: form,
      });
      const data = await res.json();

      if (data.success) {
        dispatch(updateCategory(data.data));
        toast.success("Category updated successfully");
        onClose();
      } else {
        toast.error(data.message || "Update failed");
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
      <motion.form
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-white text-black w-full max-w-[460px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-5 sm:p-7"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Edit Category</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-black transition cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Category Title
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Title"
          className="w-full border border-gray-300 p-2.5 mb-5 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Thumbnail
        </label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center gap-4 border-2 border-dashed border-gray-300 hover:border-orange-400 rounded-xl p-3 sm:p-4 transition cursor-pointer"
        >
          {preview ? (
            <Image
              src={preview}
              alt="preview"
              width={72}
              height={72}
              className="rounded-lg object-cover w-[72px] h-[72px] shrink-0"
            />
          ) : (
            <div className="w-[72px] h-[72px] shrink-0 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
              <ImagePlus size={26} />
            </div>
          )}
          <div className="text-left">
            <p className="text-sm font-medium text-gray-700">
              Change image
            </p>
            <p className="text-xs text-gray-400 mt-0.5">PNG, JPG or WEBP</p>
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_IMAGE_ACCEPT}
          onChange={handleFile}
          className="hidden"
        />

        <div className="flex justify-end gap-3 mt-7">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            className="bg-orange-500 text-black px-5 py-2.5 rounded-lg font-semibold hover:bg-orange-400 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Saving..." : "Update"}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
