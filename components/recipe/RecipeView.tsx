"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RecipeIngredientView } from "@/types/recipe-ingredient";
import { RecipeStepDraft } from "@/types/recipe-step";
import { NutrientsMap } from "@/types/nutrients";
import { NutrientReference } from "@/types/nutrient.dto";
import { RecipePreview } from "./RecipePreview";

type Props = {
  recipe: {
    recipe_id: string;
    title: string;
    description: string;
    status: "draft" | "ready" | "published" | "archived";
    photo_url?: string | null;

    recipe_type_id: number | null;
    recipe_type_name: string | null;
    difficulty: "easy" | "medium" | "hard" | null;
    prep_time_min: number | null;
    cook_time_min: number | null;
    base_servings: number;
    base_output_weight_g: number;
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
  author: {
    recipe_author_id: string;
    display_name: string;
    type: "user" | "blogger" | "system";
    avatar_url: string | null;
    profile_url: string | null;
  } | null;
  videos: {
    recipe_video_id: string;
    platform: "youtube" | "instagram" | "tiktok";
    url: string;
    author: {
      recipe_author_id: string;
      display_name: string;
      profile_url: string | null;
    } | null;
  }[];
  nutrients: NutrientsMap;
  nutrientRefs: NutrientReference[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const difficultyMap = {
  easy: "Легко",
  medium: "Середньо",
  hard: "Складно",
};

export default function RecipeView({
  recipe,
  ingredients,
  steps,
  cuisines,
  dietary_tags,
  author,
  videos,
  nutrients,
  nutrientRefs,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const [showNutrition, setShowNutrition] = useState(false);
  const router = useRouter();

  const totalTime =
    (Number(recipe.prep_time_min) ?? 0) + (Number(recipe.cook_time_min) ?? 0);
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
          <p className="text-gray-600">{recipe.description}</p>
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
          {author && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {author.avatar_url ? (
                <Image
                  src={author.avatar_url}
                  alt={author.display_name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                  👤
                </div>
              )}

              <span>
                {author.profile_url ? (
                  <a
                    href={author.profile_url}
                    target="_blank"
                    className="underline"
                  >
                    {author.display_name}
                  </a>
                ) : (
                  <span className="font-medium">{author.display_name}</span>
                )}
              </span>

              {author.type === "system" && (
                <span className="text-xs text-gray-400">(MealMind)</span>
              )}
            </div>
          )}
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
      {/* Quick facts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 rounded-lg border bg-gray-50 p-4 text-sm">
        <div>
          <div className="text-gray-500">Тип страви</div>
          <div className="font-medium">{recipe.recipe_type_name ?? "—"}</div>
        </div>

        <div>
          <div className="text-gray-500">Складність</div>
          <div className="font-medium">
            {recipe.difficulty ? difficultyMap[recipe.difficulty] : "—"}
          </div>
        </div>

        <div>
          <div className="text-gray-500">Час</div>
          <div className="font-medium">
            {totalTime > 0 ? `${totalTime} хв` : "—"}
          </div>
        </div>

        <div>
          <div className="text-gray-500">Порції</div>
          <div className="font-medium">{recipe.base_servings || "—"}</div>
        </div>

        <div>
          <div className="text-gray-500">Загальний вихід</div>
          <div className="font-medium">
            {recipe.base_output_weight_g
              ? `${recipe.base_output_weight_g} г`
              : "—"}
          </div>
        </div>

        <div>
          <div className="text-gray-500">На порцію</div>
          <div className="font-medium">
            {recipe.base_output_weight_g && recipe.base_servings
              ? `${Math.round(
                  recipe.base_output_weight_g / recipe.base_servings,
                )} г`
              : "—"}
          </div>
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

      {/* Nutrients */}
      <button
        type="button"
        onClick={() => setShowNutrition((v) => !v)}
        className="text-sm text-blue-600 underline"
      >
        {showNutrition
          ? "Сховати поживну цінність"
          : "Показати поживну цінність"}
      </button>
      {showNutrition &&
        recipe.base_output_weight_g > 0 &&
        recipe.base_servings > 0 &&
        Object.keys(nutrients).length > 0 && (
          <section className="space-y-2">
            <RecipePreview
              servings={recipe.base_servings}
              outputWeight={recipe.base_output_weight_g}
              nutrients={nutrients}
              nutrientRefs={nutrientRefs}
            />
          </section>
        )}
      {/* Steps */}
      <section className="space-y-2">
        <h2 className="font-medium">Кроки приготування</h2>

        <ol className="list-decimal space-y-2 pl-5 text-sm">
          {steps.map((s) => (
            <li key={s.id}>{s.text}</li>
          ))}
        </ol>
      </section>

      {videos.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-medium">Відео рецепта</h2>

          <ul className="space-y-2">
            {videos.map((v) => (
              <li key={v.recipe_video_id} className="text-sm">
                <a href={v.url} target="_blank" className="underline">
                  {v.platform}
                </a>

                {v.author && (
                  <span className="text-gray-500 ml-2">
                    —{" "}
                    {v.author.profile_url ? (
                      <a
                        href={v.author.profile_url}
                        target="_blank"
                        className="underline"
                      >
                        {v.author.display_name}
                      </a>
                    ) : (
                      v.author.display_name
                    )}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

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
