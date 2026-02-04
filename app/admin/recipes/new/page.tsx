"use client";

import { useState, useMemo } from "react";
import { nanoid } from "nanoid";
import { useProductNutrients } from "@/lib/hooks/useProductNutrients";
import { useNutrientsReference } from "@/lib/hooks/useNutrientsReference";
import { useRecipeTypes } from "@/lib/hooks/useRecipeTypes";
import { RecipeCreatePayload } from "@/types/recipe";
import { RecipeIngredientDraft } from "@/types/recipe-ingredient";
import { IngredientRow } from "@/components/recipe/IngredientRow";
import { RecipeStepDraft } from "@/types/recipe-step";
import { StepRow } from "@/components/recipe/StepRow";
import { aggregateRecipeNutrients } from "@/lib/recipe-nutrients.aggregate";
// import { NutrientsMap } from "@/types/nutrients";
import { RecipePreview } from "@/components/recipe/RecipePreview";
import { validateRecipeForPublish } from "@/lib/recipe-validation";
import { RecipePhotoUploader } from "@/components/recipe/RecipePhotoUploader";

// const productNutrientsMap: Record<string, NutrientsMap> = {};

export default function AdminRecipeCreatePage() {
  const [form, setForm] = useState<RecipeCreatePayload>({
    recipe_id: undefined,

    title: "",
    description: "",
    recipe_type_id: null,

    base_servings: 1,
    base_output_weight_g: 0,
    container_weight_g: null,

    visibility: "private",
    status: "draft",
    family_id: null,
  });

  const [ingredients, setIngredients] = useState<RecipeIngredientDraft[]>([]);
  const [steps, setSteps] = useState<RecipeStepDraft[]>([]);
  const { items: nutrientRefs } = useNutrientsReference();
  const { items: recipeTypes } = useRecipeTypes();

  const [loading, setLoading] = useState(false);
  const [publishErrors, setPublishErrors] = useState<string[]>([]);

  function addIngredient() {
    setIngredients((prev) => [
      ...prev,
      {
        id: nanoid(),
        product_id: null,
        quantity_g: 0,
        is_optional: false,
      },
    ]);
  }

  function mapIngredientsForApi(
    recipeId: string,
    ingredients: RecipeIngredientDraft[],
  ) {
    return {
      recipe_id: recipeId,
      ingredients: ingredients
        .filter((i) => i.product_id && i.quantity_g > 0)
        .map((i, index) => ({
          product_id: i.product_id!,
          quantity_g: i.quantity_g,
          is_optional: i.is_optional,
          order_index: index + 1,
        })),
    };
  }

  function addStep() {
    setSteps((prev) => [
      ...prev,
      {
        id: nanoid(),
        order: prev.length + 1,
        text: "",
      },
    ]);
  }

  function removeStep(stepId: string) {
    setSteps((prev) =>
      prev
        .filter((s) => s.id !== stepId)
        .map((s, index) => ({
          ...s,
          order: index + 1,
        })),
    );
  }

  function mapStepsForApi(recipeId: string, steps: RecipeStepDraft[]) {
    return {
      recipe_id: recipeId,
      steps: steps
        .filter((s) => s.text.trim().length > 0)
        .map((s, index) => ({
          step_number: index + 1,
          instruction: s.text.trim(),
          timer_sec: null,
        })),
    };
  }

  const productIds = useMemo(
    () => ingredients.map((i) => i.product_id).filter(Boolean) as string[],
    [ingredients],
  );

  const productNutrientsMap = useProductNutrients(productIds);

  const recipeNutrients = useMemo(
    () => aggregateRecipeNutrients(ingredients, productNutrientsMap),
    [ingredients, productNutrientsMap],
  );

  const calculatedWeight = useMemo(
    () => ingredients.reduce((sum, i) => sum + (i.quantity_g || 0), 0),
    [ingredients],
  );

  const effectiveOutputWeight =
    form.base_output_weight_g > 0
      ? form.base_output_weight_g
      : calculatedWeight;

  async function handleSubmit() {
    setLoading(true);

    try {
      // 1️⃣ Save recipe meta
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      const recipeId = form.recipe_id ?? data.recipe_id;

      if (!recipeId) {
        throw new Error("Recipe ID not returned");
      }

      if (!form.recipe_id) {
        setForm((prev) => ({
          ...prev,
          recipe_id: recipeId,
        }));
      }

      // 2️⃣ Save ingredients
      if (ingredients.length > 0) {
        const ingredientsPayload = mapIngredientsForApi(recipeId, ingredients);

        await fetch("/api/recipes/ingredients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ingredientsPayload),
        });
      }

      // 3️⃣ Save steps
      if (steps.length > 0) {
        const stepsPayload = mapStepsForApi(recipeId, steps);

        await fetch("/api/recipes/steps", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stepsPayload),
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handlePublish() {
    const result = validateRecipeForPublish(form, ingredients, steps);

    if (!result.valid) {
      setPublishErrors(result.errors);
      return;
    }

    if (!form.recipe_id) {
      setPublishErrors(["Спочатку збережіть рецепт"]);
      return;
    }

    setPublishErrors([]);

    await fetch("/api/recipes/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe_id: form.recipe_id,
      }),
    });
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-xl font-semibold">Create recipe</h1>

      {/* Basic info */}
      <div className="space-y-2">
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Recipe title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full rounded border px-3 py-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {/* === Додаткова інформація === */}
      <div className="space-y-3">
        <h2 className="font-medium">Додаткова інформація</h2>

        {/* Times */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min={0}
            placeholder="Підготовка (хв)"
            className="rounded border px-3 py-2"
            value={form.prep_time_min ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                prep_time_min: Number(e.target.value) || undefined,
              })
            }
          />

          <input
            type="number"
            min={0}
            placeholder="Приготування (хв)"
            className="rounded border px-3 py-2"
            value={form.cook_time_min ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                cook_time_min: Number(e.target.value) || undefined,
              })
            }
          />
        </div>

        {/* Difficulty */}
        <select
          className="w-full rounded border px-3 py-2"
          value={form.difficulty ?? ""}
          onChange={(e) => {
            const value = e.target.value as "" | "easy" | "medium" | "hard";

            setForm({
              ...form,
              difficulty: value === "" ? undefined : value,
            });
          }}
        >
          <option value="">Складність</option>
          <option value="easy">Легко</option>
          <option value="medium">Середньо</option>
          <option value="hard">Складно</option>
        </select>

        {/* Photo */}
        <RecipePhotoUploader
          photos={form.photos}
          onChange={(photos) =>
            setForm((prev) => ({
              ...prev,
              photos,
            }))
          }
          onCoverChange={(url) =>
            setForm((prev) => ({
              ...prev,
              photo_url: url || undefined,
            }))
          }
        />
      </div>

      <select
        value={form.recipe_type_id ?? ""}
        onChange={(e) =>
          setForm({ ...form, recipe_type_id: Number(e.target.value) })
        }
        className="w-full rounded border px-3 py-2"
      >
        <option value="">Тип страви</option>
        {recipeTypes.map((type) => (
          <option key={type.recipe_type_id} value={type.recipe_type_id}>
            {type.name.ua}
          </option>
        ))}
      </select>
      {/* Portions */}
      <div className="grid grid-cols-3 gap-3">
        <input
          type="number"
          min={1}
          className="rounded border px-3 py-2"
          placeholder="Servings"
          value={form.base_servings}
          onChange={(e) =>
            setForm({
              ...form,
              base_servings: Number(e.target.value),
            })
          }
        />

        <input
          type="number"
          min={0}
          className="rounded border px-3 py-2"
          placeholder="Output weight (g)"
          value={form.base_output_weight_g}
          onChange={(e) =>
            setForm({
              ...form,
              base_output_weight_g: Number(e.target.value),
            })
          }
        />

        <input
          type="number"
          min={0}
          className="rounded border px-3 py-2"
          placeholder="Container weight (g)"
          value={form.container_weight_g ?? ""}
          onChange={(e) =>
            setForm({
              ...form,
              container_weight_g: Number(e.target.value),
            })
          }
        />
      </div>
      {/* === Інгредієнти === */}
      <div className="space-y-3">
        <h2 className="font-medium">Інгредієнти</h2>

        {ingredients.map((ingredient) => (
          <IngredientRow
            key={ingredient.id}
            ingredient={ingredient}
            onChange={(next) =>
              setIngredients((prev) =>
                prev.map((item) => (item.id === ingredient.id ? next : item)),
              )
            }
            onRemove={() =>
              setIngredients((prev) =>
                prev.filter((item) => item.id !== ingredient.id),
              )
            }
          />
        ))}

        <button
          type="button"
          onClick={addIngredient}
          className="rounded border px-3 py-1 text-sm"
        >
          + Додати інгредієнт
        </button>
      </div>
      {/* === Кроки приготування === */}
      <div className="space-y-3">
        <h2 className="font-medium">Кроки приготування</h2>

        {steps.map((step) => (
          <StepRow
            key={step.id}
            step={step}
            onChange={(next) =>
              setSteps((prev) => prev.map((s) => (s.id === step.id ? next : s)))
            }
            onRemove={() => removeStep(step.id)}
          />
        ))}

        <button
          type="button"
          onClick={addStep}
          className="rounded border px-3 py-1 text-sm"
        >
          + Додати крок
        </button>
      </div>

      {/* === Попередній перегляд рецепта === */}
      {ingredients.length > 0 &&
        form.base_servings > 0 &&
        Object.keys(recipeNutrients).length > 0 && (
          <RecipePreview
            servings={form.base_servings}
            outputWeight={effectiveOutputWeight}
            nutrients={recipeNutrients}
            nutrientRefs={nutrientRefs}
          />
        )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded border px-4 py-2"
        >
          Зберегти чернетку
        </button>

        <button
          onClick={handlePublish}
          className="rounded bg-black px-4 py-2 text-white"
        >
          Опублікувати
        </button>
      </div>
      {publishErrors.length > 0 && (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-sm">
          <ul className="list-disc pl-5">
            {publishErrors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
