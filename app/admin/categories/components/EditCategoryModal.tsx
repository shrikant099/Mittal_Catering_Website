// components/admin/categories/EditCategoryModal.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
export default function EditCategoryModal({
  category,
  onClose,
}: {
  category: any;
  onClose: () => void;
}) {
  const [name, setName] = useState(category.name);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(category.thumbnail);
  const [loading, setLoading] = useState(false);

  function handleFile(e: any) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("name", name);
    if (file) form.append("thumbnail", file);

    const res = await fetch(`/api/categories/${category._id}`, {
      method: "PUT",
      body: form,
    });
    const data = await res.json();

    if (data.success) {
      window.location.reload();
      toast.success("Category updated successfully");
    } else alert(data.message || "Update failed");

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black w-[520px] p-6 rounded-2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Category</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Title"
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <div className="mb-4">
          <p className="text-sm mb-2">Thumbnail</p>
          <div className="flex items-center gap-4">
            <Image
              src={preview}
              alt="preview"
              width={80}
              height={80}
              className="rounded-lg"
            />
            <input type="file" onChange={handleFile} />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2">
            Cancel
          </button>
          <button className="bg-orange-500 px-4 py-2 rounded">
            {loading ? "Saving..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
