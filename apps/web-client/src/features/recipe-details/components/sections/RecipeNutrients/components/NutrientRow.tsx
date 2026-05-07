import { NutrientDTO } from "@/features/recipe-details/types/recipe-details.types";
import { formatValue } from "../utils/formatValue";
import { getVisualPercent } from "../utils/getVisualPercent";

export function NutrientRow({ nutrient }: { nutrient: NutrientDTO }) {
  return (
    <div className="p-3 space-y-1">
      {/* верхній ряд */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-700">{nutrient.name}</span>

        <span className="text-sm font-medium text-gray-900">
          {formatValue(nutrient.value)} {nutrient.unit}
        </span>
      </div>

      {/* subtle bar */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-400"
          style={{
            width: `${getVisualPercent(nutrient.value)}%`,
          }}
        />
      </div>
    </div>
  );
}
