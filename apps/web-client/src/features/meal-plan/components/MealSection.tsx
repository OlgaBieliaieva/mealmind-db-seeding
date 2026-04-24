import { AggregatedMealItem } from "@/shared/types/meal-plan.types";

type Props = {
  item: AggregatedMealItem;
};

export function MealSection({ item }: Props) {
  return (
    <div className="bg-white rounded-xl border p-3 flex justify-between items-center">
      <div>
        <div className="text-sm font-medium">{item.name}</div>

        <div className="text-xs text-gray-400">
          {item.portions} порцій · {Math.round(item.totalWeight)} г
        </div>
      </div>

      <div className="flex items-center gap-2">
        {item.users.map((u) => (
          <div
            key={u.id}
            className="w-6 h-6 rounded-full bg-gray-200 text-xs flex items-center justify-center"
          >
            {u.firstName[0]}
          </div>
        ))}
      </div>
    </div>
  );
}
