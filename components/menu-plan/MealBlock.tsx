"use client";

import { useState } from "react";
import { MenuEntry } from "@/types/menu-entry";

type Props = {
  title: string;
  entries: MenuEntry[];
};

export default function MealBlock({ title, entries }: Props) {
  const [open, setOpen] = useState(false);
  const hasEntries = entries.length > 0;
  return (
    <div className="border-t">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-3 text-left"
      >
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <span className="text-gray-400">{hasEntries && entries.length}</span>
        <span className="text-gray-400">{open ? "▴" : "+"}</span>
      </button>

      {open && !hasEntries && (
        <div className="pb-3 text-sm text-gray-400">No meals added yet</div>
      )}
    </div>
  );
}
