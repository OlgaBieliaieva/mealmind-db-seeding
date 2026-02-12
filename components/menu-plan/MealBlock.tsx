"use client";

import { useState } from "react";

type Props = {
  title: string;
};

export default function MealBlock({ title }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-3 text-left"
      >
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <span className="text-gray-400">{open ? "▴" : "+"}</span>
      </button>

      {open && (
        <div className="pb-3 text-sm text-gray-400">No meals added yet</div>
      )}
    </div>
  );
}
