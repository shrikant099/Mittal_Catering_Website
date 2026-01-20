"use client";
import { useState } from "react";
import Image from "next/image";
import { AddCategoryModal } from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import { useSelector } from "react-redux";
import DeleteCategoryModal from "./DeleteCategoryModal";

export default function CategoriesTable({ search, page }: any) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<any | null>(null);
  const [del, setDel] = useState<any | null>(null);
  const categories = useSelector((state: any) => state.category.list);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Categories Management</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-orange-500 cursor-pointer text-black px-5 py-2 rounded-lg font-semibold hover:bg-orange-400 transition"
        >
          + Add Category
        </button>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <input
          defaultValue={search}
          placeholder="Search category..."
          className="px-4 py-2 w-64 rounded-lg bg-[#1e1e1e] border border-white/10 focus:outline-none focus:border-orange-500"
          onKeyDown={(e) => {
            if (e.key === "Enter")
              window.location.href = `/admin/categories?search=${e.currentTarget.value}`;
          }}
        />
        <p className="text-sm text-white/50">
          Total: <span className="text-white">{categories.length}</span>
        </p>
      </div>

      <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg">
        <table className="w-full">
          <thead className="bg-[#2a2a2a]">
            <tr>
              <th className="px-6 py-4 text-left text-sm uppercase text-white/70">
                #
              </th>
              <th className="px-6 py-4 text-center text-sm uppercase text-white/70">
                Thumbnail
              </th>
              <th className="px-6 py-4 text-left text-sm uppercase text-white/70">
                Title
              </th>
              <th className="px-6 py-4 text-center text-sm uppercase text-white/70">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((c: any, i: number) => (
              <tr
                key={c._id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="px-6 py-4">{i + 1}</td>

                <td className="px-6 py-4 text-center">
                  <Image
                    src={c.thumbnail}
                    alt={c.name}
                    width={52}
                    height={52}
                    className="rounded-lg mx-auto"
                  />
                </td>

                <td className="px-6 py-4 font-medium">{c.name}</td>

                <td className="px-6 py-4 text-center space-x-3">
                  <button
                    onClick={() => setEdit(c)}
                    className="px-4 py-1.5 cursor-pointer
                     bg-yellow-500 text-black rounded-lg font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDel(c)}
                    className="px-4 cursor-pointer
                   py-1.5 bg-red-500 rounded-lg font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && <AddCategoryModal onClose={() => setOpen(false)} />}
      {edit && (
        <EditCategoryModal category={edit} onClose={() => setEdit(null)} />
      )}
      {del && (
        <DeleteCategoryModal category={del} onClose={() => setDel(null)} />
      )}
    </div>
  );
}
