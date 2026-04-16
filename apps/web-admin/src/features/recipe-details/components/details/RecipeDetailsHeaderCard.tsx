import Image from "next/image";
import { RecipeDetailsVM } from "@/features/recipe/types/recipe-details.vm";

type Props = {
  recipe: RecipeDetailsVM;
};

export function RecipeDetailsHeaderCard({ recipe }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="flex justify-between gap-6">
        {/* LEFT */}
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">{recipe.title}</h1>

          {recipe.description && (
            <p className="text-gray-600">{recipe.description}</p>
          )}

          {/* tags */}
          <div className="flex flex-wrap gap-2">
            {recipe.cuisines.map((c) => (
              <span
                key={c}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs"
              >
                {c}
              </span>
            ))}

            {recipe.dietaryTags.map((d) => (
              <span
                key={d}
                className="rounded-full bg-green-100 px-3 py-1 text-xs"
              >
                {d}
              </span>
            ))}
          </div>

          {/* author */}
          {recipe.author && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {recipe.author.avatarUrl ? (
                <Image
                  src={recipe.author.avatarUrl}
                  alt={recipe.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                  👤
                </div>
              )}

              <span>{recipe.author.name}</span>
            </div>
          )}
        </div>

        {/* RIGHT (image) */}
        <div className="w-[200px] h-[200px] rounded overflow-hidden bg-gray-100 flex items-center justify-center">
          {recipe.photoUrl ? (
            <Image
              src={recipe.photoUrl}
              alt={recipe.title}
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-400 text-sm">Без фото</span>
          )}
        </div>
      </div>
    </div>
  );
}
