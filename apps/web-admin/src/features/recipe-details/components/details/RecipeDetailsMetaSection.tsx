import { RecipeDetailsVM } from "@/features/recipe/types/recipe-details.vm";

const difficultyMap = {
  easy: "Легко",
  medium: "Середньо",
  hard: "Складно",
};

type Props = {
  recipe: RecipeDetailsVM;
};

export function RecipeDetailsMetaSection({ recipe }: Props) {
  const totalTime = (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0);

  const weightPerServing =
    recipe.outputWeight && recipe.servings
      ? Math.round(recipe.outputWeight / recipe.servings)
      : null;

  return (
    <div className="rounded-2xl border bg-gray-50 p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
        {/* TYPE */}
        <MetaItem label="Тип страви" value={recipe.type} />

        {/* DIFFICULTY */}
        <MetaItem
          label="Складність"
          value={recipe.difficulty ? difficultyMap[recipe.difficulty] : null}
        />

        {/* TIME */}
        <MetaItem
          label="Час"
          value={totalTime > 0 ? `${totalTime} хв` : null}
        />

        {/* SERVINGS */}
        <MetaItem label="Порції" value={recipe.servings} />

        {/* TOTAL WEIGHT */}
        <MetaItem
          label="Загальний вихід"
          value={recipe.outputWeight ? `${recipe.outputWeight} г` : null}
        />

        {/* PER SERVING */}
        <MetaItem
          label="На порцію"
          value={weightPerServing ? `${weightPerServing} г` : null}
        />
      </div>
    </div>
  );
}

/* ============================================ */

function MetaItem({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div>
      <div className="text-gray-500">{label}</div>
      <div className="font-medium">{value ?? "—"}</div>
    </div>
  );
}
