import { ShoppingCart } from "lucide-react";
import { AggregatedMealItemDTO } from "@/shared/types/meal-plan.types";

type Props = {
  item: AggregatedMealItemDTO;
};

export function ProductMealItem({ item }: Props) {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <ShoppingCart size={16} className="text-gray-400" />
          <span>{item.name}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
          <span>{item.categoryName}</span>
        </div>
        {/* PORTIONS + WEIGHT */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
          <span>🍽 {item.portions}</span>
          <span>
            ⚖ {Math.round(item.totalWeight)} {item.unit}
          </span>
        </div>
      </div>
    </div>
  );
}
