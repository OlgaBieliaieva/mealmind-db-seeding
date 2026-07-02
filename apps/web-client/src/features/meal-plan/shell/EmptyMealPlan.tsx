"use client";

import { useAddToPlanNavigation } from "@/features/meal-plan/hooks/useAddToPlanNavigation";

export function EmptyMealPlan() {
  const navigateToAdd = useAddToPlanNavigation();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* ICON */}
      <div className="text-5xl mb-4">🍽️</div>

      {/* TITLE */}
      <div className="text-lg font-semibold text-gray-900">
        Немає запланованих страв
      </div>

      {/* DESCRIPTION */}
      <div className="text-sm text-gray-500 mt-2 max-w-xs">
        Додайте першу страву до плану, щоб почати організацію харчування
      </div>

      {/* BUTTON */}
      <button
        onClick={() => navigateToAdd()}
        className="mt-6 px-5 py-2.5 rounded-xl bg-black text-white text-sm font-medium active:scale-95 transition"
      >
        ➕ Додати страву
      </button>
    </div>
  );
}
