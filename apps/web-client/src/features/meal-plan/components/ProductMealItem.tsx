import { AggregatedMealItemDTO } from "@/shared/types/meal-plan.types";

type Props = {
  item: AggregatedMealItemDTO;
};

export function ProductMealItem({ item }: Props) {
  return (
    <div className="flex gap-3 items-center">
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
        🥕
      </div>

      <div className="flex-1">
        <div className="text-sm font-medium">{item.name}</div>

        <div className="text-xs text-gray-400 mt-1">
          ⚖ {Math.round(item.totalWeight)} {item.unit}
        </div>
      </div>
    </div>
  );
}
