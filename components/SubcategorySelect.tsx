"use client";

import { CategoryNode } from "@/types/category.dto";

type Props = {
  parentCategory?: CategoryNode;
  value?: number;
  onChange: (id: number | undefined) => void;
  disabled?: boolean;
};

export function SubcategorySelect({
  parentCategory,
  value,
  onChange,
  disabled,
}: Props) {
  // якщо категорія не обрана
  if (!parentCategory) return null;

  // якщо немає підкатегорій
  if (!parentCategory.children.length) {
    return (
      <div className="text-sm text-gray-500 italic">
        Subcategory not defined
      </div>
    );
  }

  return (
    <select
      value={value ?? ""}
      disabled={disabled}
      onChange={(e) =>
        onChange(e.target.value ? Number(e.target.value) : undefined)
      }
      className="w-full rounded border px-3 py-2 disabled:bg-gray-100"
    >
      <option value="">Select subcategory</option>

      {parentCategory.children.map((c) => (
        <option key={c.category_id} value={c.category_id}>
          {c.name.ua}
        </option>
      ))}
    </select>
  );
}
