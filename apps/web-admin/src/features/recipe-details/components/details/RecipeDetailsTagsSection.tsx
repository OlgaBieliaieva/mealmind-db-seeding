import { DetailsSectionCard } from "@/features/product-details/components/details/DetailsSectionCard";
import { RecipeDetailsVM } from "@/features/recipe/types/recipe-details.vm";

type Props = {
  recipe: RecipeDetailsVM;
};

export function RecipeDetailsTagsSection({ recipe }: Props) {
  const hasData = recipe.cuisines.length > 0 || recipe.dietaryTags.length > 0;

  if (!hasData) return null;

  return (
    <DetailsSectionCard title="Теги">
      <div className="space-y-3">
        {recipe.cuisines.length > 0 && (
          <div>
            <div className="text-xs text-gray-500 mb-1">Кухні</div>

            <div className="flex flex-wrap gap-2">
              {recipe.cuisines.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {recipe.dietaryTags.length > 0 && (
          <div>
            <div className="text-xs text-gray-500 mb-1">Дієтичні теги</div>

            <div className="flex flex-wrap gap-2">
              {recipe.dietaryTags.map((d) => (
                <span
                  key={d}
                  className="rounded-full bg-green-100 px-3 py-1 text-xs"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </DetailsSectionCard>
  );
}
