"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { AddCategoryModal } from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "@/features/category/categorySlice";
import DeleteCategoryModal from "./DeleteCategoryModal";
import Pagination from "../../components/Pagination";

const PAGE_SIZE = 10;

export default function CategoriesTable({
  initialPage = 1,
  initialTotalPages = 1,
}: {
  initialPage?: number;
  initialTotalPages?: number;
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<any | null>(null);
  const [del, setDel] = useState<any | null>(null);
  const categoryList = useSelector((state: any) => state.category.list);
  const categories = Array.isArray(categoryList) ? categoryList : [];

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);
  const isFirstRun = useRef(true);

  // Debounce the search box so we don't hit the API on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // A new search always starts back at page 1.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // Fetch whenever the (debounced) search term or page changes — skips the
  // very first run since the server already provided page 1.
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    let ignore = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/categories?search=${encodeURIComponent(
            debouncedSearch
          )}&page=${page}&limit=${PAGE_SIZE}`
        );
        const data = await res.json();
        if (!ignore && data.success) {
          dispatch(setCategories(data.data));
          setTotalPages(data.meta?.totalPages ?? 1);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [debouncedSearch, page, dispatch]);

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Categories Management
          </h1>
          <p className="text-white/50 text-sm mt-1">
            Manage the food categories shown on your menu
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-orange-500 cursor-pointer text-black px-5 py-2.5 rounded-lg font-semibold hover:bg-orange-400 transition self-start sm:self-auto"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search category..."
            className="w-full pl-9 pr-9 py-2.5 rounded-lg bg-[#1e1e1e] border border-white/10 focus:outline-none focus:border-orange-500 transition"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <p className="text-sm text-white/50">
          {loading ? "Loading..." : `${categories.length} on this page`}
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
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
                <motion.tr
                  key={c._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4">
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <Image
                      src={c.thumbnail}
                      alt={c.name}
                      width={52}
                      height={52}
                      className="rounded-lg mx-auto object-cover w-[52px] h-[52px]"
                    />
                  </td>

                  <td className="px-6 py-4 font-medium">{c.name}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setEdit(c)}
                        title="Edit category"
                        className="w-9 h-9 flex items-center justify-center cursor-pointer bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setDel(c)}
                        title="Delete category"
                        className="w-9 h-9 flex items-center justify-center cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {categories.length === 0 && (
          <div className="py-16 text-center text-white/40">
            {loading ? "Loading..." : "No categories found."}
          </div>
        )}

        {categories.length > 0 && (
          <div className="border-t border-white/10 px-4">
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
              disabled={loading}
            />
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && <AddCategoryModal key="add" onClose={() => setOpen(false)} />}
        {edit && (
          <EditCategoryModal
            key="edit"
            category={edit}
            onClose={() => setEdit(null)}
          />
        )}
        {del && (
          <DeleteCategoryModal
            key="delete"
            category={del}
            onClose={() => setDel(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
