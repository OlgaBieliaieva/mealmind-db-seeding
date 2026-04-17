import { DetailsSectionCard } from "@/features/product-details/components/details/DetailsSectionCard";
import { RecipeDetailsVM } from "@/features/recipe/types/recipe-details.vm";

type Props = {
  recipe: RecipeDetailsVM;
};

export function RecipeDetailsIngredientsSection({ recipe }: Props) {
  if (!recipe.ingredients.length) {
    return null;
  }

  return (
    <DetailsSectionCard title="Інгредієнти">
      <ul className="space-y-3">
        {recipe.ingredients.map((i) => (
          <li
            key={i.id}
            className="flex items-center justify-between gap-2 text-sm"
          >
            {/* LEFT */}
            <div className="flex flex-col min-w-0">
              <span className="font-medium truncate">{i.name}</span>

              {i.brand && (
                <span className="text-xs text-gray-500 truncate">
                  {i.brand}
                </span>
              )}

              {i.isOptional && (
                <span className="text-xs text-gray-400">(optional)</span>
              )}
            </div>

            {/* RIGHT */}
            <div className="font-medium shrink-0">{i.quantity} г</div>
          </li>
        ))}
      </ul>
    </DetailsSectionCard>
  );
}
