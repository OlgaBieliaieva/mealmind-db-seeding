"use client";

import { ViewMode } from "../hooks/usePlanParams";

type Props = {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
};

export function ViewModeSwitch({ value, onChange }: Props) {
  return (
    <div className="flex items-center justify-end">
      <div className="flex bg-gray-100 rounded-full p-1">
        <button
          onClick={() => onChange("meal")}
          className={`px-3 py-1 text-sm rounded-full transition ${
            value === "meal" ? "bg-white shadow text-black" : "text-gray-500"
          }`}
        >
          🍳
        </button>

        <button
          onClick={() => onChange("user")}
          className={`px-3 py-1 text-sm rounded-full transition ${
            value === "user" ? "bg-white shadow text-black" : "text-gray-500"
          }`}
        >
          👥
        </button>
      </div>
    </div>
  );
}
