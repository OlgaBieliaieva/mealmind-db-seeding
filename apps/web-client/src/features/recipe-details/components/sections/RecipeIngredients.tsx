import { RecipeDetailsDTO } from "../../types/recipe-details.types";

export function RecipeIngredients({ recipe }: { recipe: RecipeDetailsDTO }) {
  return (
    <div className="px-4 mt-4 space-y-2">
      {recipe.ingredients.map((i) => (
        <div
          key={i.id}
          className="bg-white rounded-xl p-3 flex justify-between"
        >
          <span>{i.name}</span>
          <span>
            {i.quantity} {i.unit}
          </span>
        </div>
      ))}
    </div>
  );
}
