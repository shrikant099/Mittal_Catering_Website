// components/admin/menu/AddMenuModal.tsx
"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addMenuItem } from "@/features/menu/menuSlice";
import { toast } from "react-hot-toast";
import { ImagePlus, X } from "lucide-react";
import {
  ALLOWED_IMAGE_ACCEPT,
  ALLOWED_IMAGE_MESSAGE,
  isAllowedImageType,
} from "@/lib/imageValidation";
import VariantsEditor, { emptyVariantRow, VariantRow } from "./VariantsEditor";

export default function AddMenuModal({ onClose }: { onClose: () => void }) {
  const dispatch = useDispatch();
  const categoryList = useSelector((s: any) => s.category.list);
  const categories = Array.isArray(categoryList) ? categoryList : [];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasVariants, setHasVariants] = useState(false);
  const [variants, setVariants] = useState<VariantRow[]>([emptyVariantRow()]);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!isAllowedImageType(f)) {
      toast.error(ALLOWED_IMAGE_MESSAGE);
      e.target.value = "";
      setPreview(null);
      return;
    }
    setPreview(URL.createObjectURL(f));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const file = form.get("image") as File;
    if (file && file.size > 0 && !isAllowedImageType(file)) {
      toast.error(ALLOWED_IMAGE_MESSAGE);
      return;
    }

    if (hasVariants) {
      const cleaned = variants
        .map((v) => ({
          label: v.label.trim(),
          price: Number(v.price),
          discount: Number(v.discount) || 0,
        }))
        .filter((v) => v.label && v.price > 0);

      if (cleaned.length === 0) {
        toast.error("Add at least one variant with a name and price");
        return;
      }
      form.set("variants", JSON.stringify(cleaned));
    } else {
      form.set("variants", "[]");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/menu", { method: "POST", body: form });
      const data = await res.json();

      if (data.success) {
        dispatch(addMenuItem(data.data));
        onClose();
        toast.success("Menu item added successfully");
      } else {
        toast.error(data.message || "Failed to create menu item");
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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.form
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="bg-white text-black w-full max-w-[720px] max-h-[92vh] overflow-y-auto rounded-2xl p-5 sm:p-7"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Add Menu Item</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-black transition cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Item Name">
            <input
              name="name"
              required
              placeholder="e.g. Jain Dal Tadka"
              className="input"
            />
          </Field>

          <Field label="Category">
            <select name="category" required className="input">
              <option value="">Select category</option>
              {categories.map((c: any) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Food Type">
            <select name="foodType" required defaultValue="veg" className="input">
              <option value="veg">Vegetarian</option>
              <option value="non_veg">Non Vegetarian</option>
            </select>
          </Field>

          <Field label="Status">
            <select name="status" defaultValue="active" className="input">
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </select>
          </Field>
        </div>

        {/* PRICING */}
        <div className="mt-6 border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-gray-700">Pricing</p>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasVariants}
                onChange={(e) => setHasVariants(e.target.checked)}
                className="accent-orange-500 w-4 h-4 cursor-pointer"
              />
              Has multiple sizes / variants
            </label>
          </div>

          {hasVariants ? (
            <div className="mt-3">
              <VariantsEditor variants={variants} onChange={setVariants} />
              <p className="text-xs text-gray-400 mt-2">
                e.g. same item &quot;Dal Tadka&quot; as 250 ML, 500 ML, 650 ML
                — each with its own price
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 mt-3">
              <Field label="Price">
                <input
                  name="price"
                  type="number"
                  min={0}
                  required
                  className="input"
                />
              </Field>
              <Field label="Discount (%)">
                <input
                  name="discount"
                  type="number"
                  min={0}
                  max={100}
                  defaultValue={0}
                  className="input"
                />
              </Field>
            </div>
          )}
        </div>

        <div className="mt-5 grid sm:grid-cols-2 gap-5">
          <Field label="Description">
            <textarea
              name="description"
              required
              className="input h-28 resize-none"
            />
          </Field>

          <Field label="Image (optional)">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center gap-4 border-2 border-dashed border-gray-300 hover:border-orange-400 rounded-xl p-3 transition cursor-pointer"
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
                  {preview ? "Change image" : "Upload image"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  PNG, JPG or WEBP — not required
                </p>
              </div>
            </button>
            <input
              ref={fileInputRef}
              name="image"
              type="file"
              accept={ALLOWED_IMAGE_ACCEPT}
              onChange={onFile}
              className="hidden"
            />
          </Field>
        </div>

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
            className="bg-orange-500 text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-400 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Saving..." : "Save Item"}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
