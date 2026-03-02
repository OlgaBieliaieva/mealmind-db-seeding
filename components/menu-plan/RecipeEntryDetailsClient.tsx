"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createRecipeEntry } from "@/app/plan/actions/create-recipe-entry";
import { RecipeFull } from "@/types/recipe-views";

type Props = {
  planId: string;
  recipeFull: RecipeFull;
  date: string;
  mealTypeId: number;
  userId: string;
};

export default function RecipeEntryDetailsClient({
  planId,
  recipeFull,
  date,
  mealTypeId,
  userId,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const recipe = recipeFull.recipe;

  const defaultPortion =
    recipe.base_servings > 0
      ? Math.round(recipe.base_output_weight_g / recipe.base_servings)
      : 100;

  const [mode, setMode] = useState<"planning" | "cooking">("planning");
  const [plannedWeight, setPlannedWeight] = useState<number>(defaultPortion);

  const scale =
    recipe.base_output_weight_g > 0
      ? plannedWeight / recipe.base_output_weight_g
      : 1;

  const handleAdd = () => {
    if (!plannedWeight || !userId) return;

    startTransition(async () => {
      await createRecipeEntry({
        planId,
        recipeId: recipe.recipe_id,
        date,
        mealTypeId,
        userId,
        plannedWeight,
      });

      router.back();
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      {/* HEADER */}
      <div className="flex gap-6 border-b pb-3">
        <button
          onClick={() => setMode("planning")}
          className={`text-sm font-medium ${
            mode === "planning" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          Планування
        </button>

        <button
          onClick={() => setMode("cooking")}
          className={`text-sm font-medium ${
            mode === "cooking" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          Приготування
        </button>
      </div>

      {/* ========================= */}
      {/* 🟢 PLANNING MODE */}
      {/* ========================= */}
      {mode === "planning" && (
        <>
          <div>
            <h1 className="text-xl font-semibold mb-2">{recipe.title}</h1>

            {recipe.photo_url && (
              <img
                src={recipe.photo_url}
                alt={recipe.title}
                className="rounded-xl w-full object-cover"
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Вага порції (г)</label>

            <input
              type="number"
              value={plannedWeight}
              onChange={(e) => setPlannedWeight(Number(e.target.value))}
              className="border rounded-xl px-3 py-2 w-full"
            />
          </div>

          <button
            disabled={isPending}
            onClick={handleAdd}
            className="w-full bg-purple-600 text-white py-3 rounded-2xl font-medium"
          >
            Додати в план
          </button>
        </>
      )}

      {/* ========================= */}
      {/* 🟣 COOKING MODE */}
      {/* ========================= */}
      {mode === "cooking" && (
        <>
          <div>
            <h2 className="text-lg font-medium mb-2">Інгредієнти</h2>

            <div className="space-y-2">
              {recipeFull.ingredients.map((ing) => (
                <div key={ing.id} className="flex justify-between text-sm">
                  <span>
                    {ing.product_name}
                    {ing.brand_name && (
                      <span className="text-gray-400"> · {ing.brand_name}</span>
                    )}
                  </span>

                  <span>{Math.round(ing.quantity_g * scale)} г</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mt-6 mb-2">
              Кроки приготування
            </h2>

            <div className="space-y-3">
              {recipeFull.steps.map((step) => (
                <div key={step.id}>
                  <div className="font-medium text-sm">Крок {step.order}</div>
                  <div className="text-sm text-gray-600">{step.text}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
