"use client";

import { Plus } from "lucide-react";

type Props = {
  onClick: () => void;
  ariaLabel?: string;
};

export function PlanFloatingActionButton({
  onClick,
  ariaLabel = "Додати в план",
}: Props) {
  return (
    <div className="fixed right-5 bottom-24 z-50">
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={onClick}
        className="
          flex h-14 w-14 items-center justify-center
          rounded-full
          bg-green-600
          text-white
          shadow-lg
          transition
          active:scale-95
        "
      >
        <Plus />
      </button>
    </div>
  );
}
