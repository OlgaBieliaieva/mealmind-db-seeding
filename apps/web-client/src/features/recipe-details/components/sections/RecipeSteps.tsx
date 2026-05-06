import { RecipeDetailsDTO } from "../../types/recipe-details.types";

export function RecipeSteps({ recipe }: { recipe: RecipeDetailsDTO }) {
  return (
    <div className="px-4 mt-4 space-y-3">
      {recipe.steps.map((s) => (
        <div key={s.id} className="flex gap-3">
          <div className="text-sm font-semibold text-gray-400">
            {s.stepNumber}
          </div>

          <div className="text-sm text-gray-800">{s.instruction}</div>
        </div>
      ))}
    </div>
  );
}
