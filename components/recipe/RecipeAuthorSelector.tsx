"use client";

import { RecipeAuthor } from "@/types/recipe-author";

type Props = {
  value: string | null;
  items: RecipeAuthor[];
  onChange: (authorId: string | null) => void;
};

export function RecipeAuthorSelector({ value, items, onChange }: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-600">Автор рецепта</label>

      <select
        className="w-full rounded border px-3 py-2"
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value === "" ? null : e.target.value)
        }
      >
        <option value="">Без автора</option>

        {items.map((a) => (
          <option key={a.recipe_author_id} value={a.recipe_author_id}>
            {a.display_name} ({a.type})
          </option>
        ))}
      </select>
    </div>
  );
}
