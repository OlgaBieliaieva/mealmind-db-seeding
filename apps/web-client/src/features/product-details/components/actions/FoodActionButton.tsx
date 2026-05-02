"use client";

import { Plus } from "lucide-react";

export function FoodActionButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute right-5 bottom-4 z-50">
      <button
        onClick={onClick}
        className="
            w-14 h-14
            rounded-full
            bg-green-600
            text-white
            flex items-center justify-center
            shadow-lg
            active:scale-95
            transition
          "
      >
        <Plus />
      </button>
    </div>
  );
}
