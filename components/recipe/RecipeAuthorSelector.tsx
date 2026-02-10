"use client";

import { useState } from "react";
import { RecipeAuthor } from "@/types/recipe-author";
import { CreateAuthorInline } from "./CreateAuthorInline";

type Props = {
  value: string | null;
  items: RecipeAuthor[];
  onChange: (authorId: string | null) => void;
  onCreateAuthor: (author: RecipeAuthor) => void;
};

export function RecipeAuthorSelector({
  value,
  items,
  onChange,
  onCreateAuthor,
}: Props) {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-2">
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

      <button
        type="button"
        className="text-sm text-blue-600 hover:underline"
        onClick={() => setIsCreating((v) => !v)}
      >
        ➕ Додати нового автора
      </button>

      {isCreating && (
        <CreateAuthorInline
          onCancel={() => setIsCreating(false)}
          onCreated={(author) => {
            onCreateAuthor(author);
            onChange(author.recipe_author_id);
            setIsCreating(false);
          }}
        />
      )}
    </div>
  );
}
