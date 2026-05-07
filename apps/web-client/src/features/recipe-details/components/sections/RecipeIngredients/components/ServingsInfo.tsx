import { Card } from "./Card";
import { InfoItem } from "./InfoItem";
import { RecipeDetailsDTO } from "@/features/recipe-details/types/recipe-details.types";

export function ServingsInfo({ recipe }: { recipe: RecipeDetailsDTO }) {
  return (
    <Card>
      <div className="flex justify-between text-sm">
        <InfoItem label="Порції" value={`${recipe.baseServings ?? 0}`} />
        <InfoItem
          label="Вага порції"
          value={`~${Math.round(recipe.baseServingWeightG)} г`}
        />
        <InfoItem label="Всього" value={`${recipe.baseOutputWeightG} г`} />
      </div>
    </Card>
  );
}
