"use client";

import { useRouter } from "next/navigation";

type MealType = {
  meal_type_id: number;
  name_ua: string;
};

type Props = {
  weekLabel: string;

  mealTypes: MealType[];
  selectedMealTypeId: number;
  onMealTypeChange: (id: number) => void;
};

export default function EntryHeader({
  weekLabel,
  mealTypes,
  selectedMealTypeId,
  onMealTypeChange,
}: Props) {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center border-b bg-white px-4 py-3 sticky top-0 z-10">
      {/* <div className="flex items-center gap-1"> */}
      <button
        onClick={() => router.back()}
        className="text-xs text-gray-400 text-left w-2/8"
      >
        ← Назад
      </button>

      {/* Meal type select */}
      <select
        value={selectedMealTypeId}
        onChange={(e) => onMealTypeChange(Number(e.target.value))}
        className="text-sm font-medium text-gray-700 bg-transparent outline-none border rounded-lg px-2 py-1 w-3/8"
      >
        {mealTypes.map((meal) => (
          <option key={meal.meal_type_id} value={meal.meal_type_id}>
            {meal.name_ua}
          </option>
        ))}
      </select>
      {/* </div> */}

      {/* Week */}
      <div className="text-xs text-gray-400 text-right w-2/8">{weekLabel}</div>
    </div>
  );
}
