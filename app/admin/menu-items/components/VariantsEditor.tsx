"use client";
import { Plus, Trash2 } from "lucide-react";

export interface VariantRow {
  label: string;
  price: string;
  discount: string;
}

export function emptyVariantRow(): VariantRow {
  return { label: "", price: "", discount: "" };
}

export default function VariantsEditor({
  variants,
  onChange,
}: {
  variants: VariantRow[];
  onChange: (variants: VariantRow[]) => void;
}) {
  function update(i: number, field: keyof VariantRow, value: string) {
    onChange(
      variants.map((v, idx) => (idx === i ? { ...v, [field]: value } : v))
    );
  }

  function remove(i: number) {
    onChange(variants.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-2">
      <div className="hidden sm:grid grid-cols-[1fr_100px_90px_32px] gap-2 px-1 text-xs font-medium text-gray-500">
        <span>Variant name</span>
        <span>Price</span>
        <span>Discount %</span>
        <span />
      </div>

      {variants.map((v, i) => (
        <div
          key={i}
          className="grid grid-cols-2 sm:grid-cols-[1fr_100px_90px_32px] gap-2 items-center"
        >
          <input
            value={v.label}
            onChange={(e) => update(i, "label", e.target.value)}
            placeholder="e.g. 250 ML"
            className="col-span-2 sm:col-span-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          />
          <input
            value={v.price}
            onChange={(e) => update(i, "price", e.target.value)}
            type="number"
            min={0}
            placeholder="Price"
            className="border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          />
          <input
            value={v.discount}
            onChange={(e) => update(i, "discount", e.target.value)}
            type="number"
            min={0}
            max={100}
            placeholder="0"
            className="border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            disabled={variants.length === 1}
            title="Remove variant"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer justify-self-end sm:justify-self-auto"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...variants, emptyVariantRow()])}
        className="inline-flex items-center gap-1.5 text-sm text-orange-600 font-medium hover:text-orange-700 transition cursor-pointer"
      >
        <Plus size={15} /> Add Variant
      </button>
    </div>
  );
}
