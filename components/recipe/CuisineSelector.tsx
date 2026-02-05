"use client";

import { Cuisine } from "@/types/cuisine";

type Props = {
  items: Cuisine[];
  value: number[];
  onChange: (next: number[]) => void;
};

export function CuisineSelector({ items, value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Кухня</h3>

      <div className="flex flex-wrap gap-2">
        {items.map((cuisine) => {
          const checked = value.includes(cuisine.cuisine_id);

          return (
            <button
              key={cuisine.cuisine_id}
              type="button"
              onClick={() => {
                if (checked) {
                  onChange(value.filter((id) => id !== cuisine.cuisine_id));
                } else {
                  onChange([...value, cuisine.cuisine_id]);
                }
              }}
              className={`rounded border px-3 py-1 text-sm ${
                checked ? "bg-black text-white" : "bg-white text-gray-700"
              }`}
            >
              {cuisine.name.ua}
            </button>
          );
        })}
      </div>
    </div>
  );
}
