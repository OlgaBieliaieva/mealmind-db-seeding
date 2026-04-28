"use client";

import { Check, Plus } from "lucide-react";

type Props = {
  item: {
    id: string;
    type: "recipe" | "product";
    title: string;
  };
  selected: boolean;
  onQuickAdd: () => void;
  onOpen: () => void;
};

export function SearchItem({ item, selected, onQuickAdd, onOpen }: Props) {
  return (
    <div className="bg-white rounded-xl border p-3 flex items-center justify-between">
      {/* CONTENT */}
      <div onClick={onOpen} className="flex-1 cursor-pointer">
        <div className="text-sm font-medium text-gray-900">{item.title}</div>

        <div className="text-xs text-gray-400 mt-1">
          {item.type === "recipe" ? "Рецепт" : "Продукт"}
        </div>
      </div>

      {/* QUICK ADD */}
      <button
        type="button"
        aria-pressed={selected}
        onClick={(e) => {
          e.stopPropagation();
          onQuickAdd();
        }}
        className="
          w-9 h-9
          rounded-full
          bg-green-600
          text-white
          flex items-center justify-center
          shadow-sm
          active:scale-95
          transition
        "
      >
        {selected ? <Check size={18} /> : <Plus size={18} />}
      </button>
    </div>
  );
}
