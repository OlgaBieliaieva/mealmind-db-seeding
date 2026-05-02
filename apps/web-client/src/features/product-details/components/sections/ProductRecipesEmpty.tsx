"use client";

export function ProductRecipesEmpty({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* ICON */}
      <div className="text-5xl mb-4">📖</div>

      {/* TITLE */}
      <div className="text-lg font-semibold text-gray-900">Немає рецептів</div>

      {/* DESCRIPTION */}
      <div className="text-sm text-gray-500 mt-2 max-w-xs">
        Цей продукт ще не використовується в рецептах. Станьте першим — створіть
        рецепт з ним.
      </div>

      {/* BUTTON */}
      <button
        onClick={onCreate}
        className="mt-6 px-5 py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium active:scale-95 transition"
      >
        ➕ Створити рецепт
      </button>
    </div>
  );
}
