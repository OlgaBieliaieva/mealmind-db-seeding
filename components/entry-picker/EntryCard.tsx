"use client";

import { PickerItem } from "@/types/entry-picker";

type Props = {
  item: PickerItem;
  checked: boolean;
  onToggle: () => void;
};

export default function EntryCard({ item, checked, onToggle }: Props) {
  return (
    <div className="bg-white rounded-2xl border p-4 flex items-center justify-between">
      <div className="flex-1">
        <div className="text-xs text-gray-400 mb-1">
          {item.type === "recipe" ? "Рецепт" : "Продукт"}
        </div>

        <div className="text-sm font-medium text-gray-800">{item.title}</div>

        <div className="text-xs text-gray-400 mt-1">0 ккал / 100г</div>
      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="w-4 h-4"
      />
    </div>
  );
}
