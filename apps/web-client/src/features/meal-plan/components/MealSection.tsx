import { MealDTO } from "@/shared/types/meal-plan.types";
type Props = {
  meal: MealDTO;
};

export function MealSection({ meal }: Props) {
  return (
    <div>
      <div className="font-medium mb-1">{meal.mealTypeId}</div>

      <div className="space-y-1">
        {meal.entries.map((e) => (
          <div
            key={e.id}
            className="text-sm flex justify-between bg-gray-50 rounded px-3 py-2"
          >
            <span>{e.name ?? e.type}</span>
            <span className="text-gray-500">{e.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
