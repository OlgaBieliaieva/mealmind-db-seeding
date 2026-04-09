"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { useRecipeForm } from "../hooks/useRecipeForm";
import { RecipeFormContext } from "../forms/recipe-form.context";
import { RECIPE_FORM_SECTIONS } from "../forms/recipe-form.registry";

export function RecipeForm() {
  const { form, onSubmit } = useRecipeForm();

  const { handleSubmit, formState } = form;
  const params = useSearchParams();
  const router = useRouter();
  const { setValue, getValues } = form;

  useEffect(() => {
    const productId = params.get("addIngredient");

    if (!productId) return;

    const current = getValues("ingredients") || [];

    setValue("ingredients", [
      ...current,
      {
        product_id: productId,
        quantity_g: 0,
        is_optional: false,
        order_index: current.length + 1,
      },
    ]);

    // очищаємо URL
    router.replace("/admin/recipes/new");
  }, [params]);

  return (
    <FormProvider {...form}>
      <RecipeFormContext.Provider
        value={{
          form,
          mode: "create",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* SECTIONS */}

          {RECIPE_FORM_SECTIONS.map((Section, i) => (
            <Section key={i} />
          ))}

          {/* ERRORS */}

          {Object.keys(formState.errors).length > 0 && (
            <div className="text-sm text-red-500">
              Заповніть обовʼязкові поля
            </div>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {formState.isSubmitting ? "Збереження..." : "Створити рецепт"}
          </button>
        </form>
      </RecipeFormContext.Provider>
    </FormProvider>
  );
}
