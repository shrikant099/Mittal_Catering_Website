"use client";
import { useDispatch } from "react-redux";
import { deleteMenuItem } from "@/features/menu/menuSlice";
import toast from "react-hot-toast";

export default function DeleteMenuModal({ item, onClose }: any) {
  const dispatch = useDispatch();
  async function del() {
    const res = await fetch(`/api/menu/${item._id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      dispatch(deleteMenuItem(item._id));
      onClose();
      toast.success("Menu item deleted successfully");
    } else alert(data.message);
  }
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white text-black w-[420px] p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-3">Delete Menu Item</h2>
        <p className="mb-6">
          Are you sure you want to delete <b>{item.name}</b>?
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={del}
            className="bg-red-500 px-4 py-2 rounded text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
