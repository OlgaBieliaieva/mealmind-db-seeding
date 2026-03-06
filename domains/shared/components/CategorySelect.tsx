"use client";

import { CategoryNode } from "@/domains/shared/types/category.types";

type Props = {
  categories: CategoryNode[];
  value?: number;
  onChange: (id: number | undefined) => void;
  disabled?: boolean;
};

export function CategorySelect({
  categories,
  value,
  onChange,
  disabled,
}: Props) {
  return (
    <select
      value={value ?? ""}
      disabled={disabled}
      onChange={(e) =>
        onChange(e.target.value ? Number(e.target.value) : undefined)
      }
      className="w-full rounded border px-3 py-2 disabled:bg-gray-100"
    >
      <option value="">Select category</option>

      {categories.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name.ua}
        </option>
      ))}
    </select>
  );
}
