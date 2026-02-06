"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { RecipeIngredientView } from "@/types/recipe-ingredient";
import { RecipeStepDraft } from "@/types/recipe-step";

type Props = {
  recipe: {
    recipe_id: string;
    title: string;
    description: string;
    status: "draft" | "ready" | "published" | "archived";
    photo_url?: string | null;
  };

  ingredients: RecipeIngredientView[];
  steps: RecipeStepDraft[];
  cuisines: {
    cuisine_id: number;
    name: string;
  }[];
  dietary_tags: {
    dietary_tag_id: number;
    name: string;
  }[];
  authors: {
    platform: string;
    url: string;
  }[];

  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export default function RecipeView({
  recipe,
  ingredients,
  steps,
  cuisines,
  dietary_tags,
  authors,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const router = useRouter();

  async function handleDeleteOrArchive() {
    if (recipe.status === "draft") {
      await fetch(`/api/recipes/${recipe.recipe_id}`, {
        method: "DELETE",
      });
    } else {
      await fetch(`/api/recipes/${recipe.recipe_id}/archive`, {
        method: "POST",
      });
    }

    router.push("/admin/recipes");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="text-sm text-gray-500 hover:text-gray-800 inline-flex items-center gap-1"
      >
        ← Назад
      </button>
      {/* Header */}
      <div className="grid grid-cols-[1fr_240px] gap-6 items-start">
        {/* Left */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{recipe.title}</h1>

            <button onClick={onToggleFavorite} className="text-2xl">
              {isFavorite ? "⭐" : "☆"}
            </button>
          </div>

          {/* Meta tags */}
          <div className="flex flex-wrap gap-2">
            {cuisines.map((c) => (
              <span
                key={c.cuisine_id}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs"
              >
                {c.name}
              </span>
            ))}

            {dietary_tags.map((d) => (
              <span
                key={d.dietary_tag_id}
                className="rounded-full bg-green-100 px-3 py-1 text-xs"
              >
                {d.name}
              </span>
            ))}
          </div>

          {/* Author */}
          {authors.length > 0 && (
            <div className="text-sm text-gray-500">
              by{" "}
              {authors.map((a) => (
                <a
                  key={a.url}
                  href={a.url}
                  target="_blank"
                  className="underline mr-2"
                >
                  {a.platform}
                </a>
              ))}
            </div>
          )}

          <p className="text-gray-700">{recipe.description}</p>
        </div>

        {/* Right */}
        <div className="w-[240px] h-[240px] rounded overflow-hidden bg-gray-100 flex items-center justify-center">
          {recipe.photo_url ? (
            <Image
              src={recipe.photo_url}
              alt={recipe.title}
              width={240}
              height={240}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <span className="text-4xl">🍽️</span>
              <span className="text-xs mt-2">Без фото</span>
            </div>
          )}
        </div>
      </div>

      {/* Ingredients */}
      <section className="space-y-2">
        <h2 className="font-medium">Інгредієнти</h2>

        <ul className="space-y-2">
          {ingredients.map((i) => (
            <li key={i.id} className="flex justify-between text-sm">
              <div>
                <span className="font-medium">{i.product_name}</span>
                {i.brand_name && (
                  <span className="text-gray-500"> · {i.brand_name}</span>
                )}
                {i.is_optional && (
                  <span className="ml-2 text-xs text-gray-400">(optional)</span>
                )}
              </div>

              <div>{i.quantity_g} г</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Steps */}
      <section className="space-y-2">
        <h2 className="font-medium">Кроки приготування</h2>

        <ol className="list-decimal space-y-2 pl-5 text-sm">
          {steps.map((s) => (
            <li key={s.id}>{s.text}</li>
          ))}
        </ol>
      </section>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={() => router.push(`/admin/recipes/${recipe.recipe_id}/edit`)}
          className="rounded border px-4 py-2"
        >
          Edit
        </button>

        <button
          onClick={handleDeleteOrArchive}
          className="rounded border border-red-300 px-4 py-2 text-red-600"
        >
          {recipe.status === "draft" ? "Delete" : "Archive"}
        </button>
      </div>
    </div>
  );
}
