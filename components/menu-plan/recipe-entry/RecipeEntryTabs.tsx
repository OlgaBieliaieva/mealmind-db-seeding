"use client";

type Mode = "planning" | "cooking";

type Props = {
  mode: Mode;
  onChange: (mode: Mode) => void;
};

export default function RecipeEntryTabs({ mode, onChange }: Props) {
  return (
    <div className="flex gap-6 border-b px-4 py-3 bg-white">
      <button
        onClick={() => onChange("planning")}
        className={`text-sm font-medium ${
          mode === "planning"
            ? "text-purple-600 border-b-2 border-purple-600"
            : "text-gray-400"
        }`}
      >
        Планування
      </button>

      <button
        onClick={() => onChange("cooking")}
        className={`text-sm font-medium ${
          mode === "cooking"
            ? "text-purple-600 border-b-2 border-purple-600"
            : "text-gray-400"
        }`}
      >
        Приготування
      </button>
    </div>
  );
}
