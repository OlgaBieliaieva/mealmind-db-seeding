"use client";

import { useState } from "react";
import { MenuEntry } from "@/types/menu-entry";

type Props = {
  title: string;
  entries: MenuEntry[];
  onAdd?: () => void;
};

export default function MealBlock({ title, entries, onAdd }: Props) {
  const [open, setOpen] = useState(false);

  const hasEntries = entries.length > 0;

  return (
    <div className="border-t">
      {/* Header */}
      <div className="w-full flex justify-between items-center py-3">
        {/* Left side: title + count */}
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

        {/* Right side: Add button */}
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
            entries.map((entry) => (
              <div key={entry.menu_entry_id} className="text-sm text-gray-600">
                {entry.entry_type} — {entry.servings ?? entry.quantity ?? ""}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
