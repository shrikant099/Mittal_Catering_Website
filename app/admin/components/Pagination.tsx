"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  onChange,
  disabled,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  disabled?: boolean;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-1 py-4 text-sm text-white/60">
      <p>
        Page <span className="text-white">{page}</span> of{" "}
        <span className="text-white">{totalPages}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(page - 1)}
          disabled={disabled || page <= 1}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1e1e1e] border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => onChange(page + 1)}
          disabled={disabled || page >= totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1e1e1e] border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
