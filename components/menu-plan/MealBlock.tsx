"use client";

import { useState } from "react";
import { MenuEntry } from "@/types/menu-entry";

type Props = {
  title: string;
  entries: MenuEntry[];
  recipesMap: Record<string, string>;
  productsMap: Record<string, string>;
  onAdd?: () => void;
};

export default function MealBlock({
  title,
  entries,
  recipesMap,
  productsMap,
  onAdd,
}: Props) {
  const [open, setOpen] = useState(false);

  const hasEntries = entries.length > 0;

  return (
    <div className="border-t">
      {/* Header */}
      <div className="w-full flex justify-between items-center py-3">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-3 text-left"
        >
          <span className="text-sm font-medium text-gray-700">{title}</span>

          {hasEntries && (
            <span className="text-xs text-gray-400">{entries.length}</span>
          )}

          <span className="text-gray-400 text-sm">{open ? "▴" : "▾"}</span>
        </button>

        {onAdd && (
          <button
            onClick={onAdd}
            className="text-sm text-purple-600 font-medium"
          >
            +
          </button>
        )}
      </div>

      {/* Content */}
      {open && (
        <div className="pb-3 space-y-2">
          {!hasEntries ? (
            <div className="text-sm text-gray-400">No meals added yet</div>
          ) : (
            entries.map((entry) => {
              const icon = entry.entry_type === "recipe" ? "🍳" : "🛒";

              const displayName =
                entry.entry_type === "recipe"
                  ? recipesMap[entry.entry_id]
                  : productsMap[entry.entry_id];

              const amount = entry.servings ?? entry.quantity ?? "";

              return (
                <div
                  key={entry.menu_entry_id}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span>{icon}</span>

                  <span className="flex-1">
                    {displayName ?? entry.entry_id}
                  </span>

                  <span className="text-gray-400">{amount}</span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
