import { DetailsSectionCard } from "@/features/product-details/components/details/DetailsSectionCard";
import { RecipeDetailsVM } from "@/features/recipe/types/recipe-details.vm";

type Props = {
  recipe: RecipeDetailsVM;
};

export function RecipeDetailsStepsSection({ recipe }: Props) {
  if (!recipe.steps.length) return null;

  return (
    <DetailsSectionCard title="Кроки приготування">
      <ol className="space-y-3 pl-5 text-sm list-decimal">
        {recipe.steps.map((step) => (
          <li key={step.id} className="leading-relaxed">
            {step.text}
          </li>
        ))}
      </ol>
    </DetailsSectionCard>
  );
}
