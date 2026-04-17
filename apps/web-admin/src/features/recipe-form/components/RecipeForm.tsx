"use client";

import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { useRecipeForm } from "../hooks/useRecipeForm";
import { RecipeFormContext } from "../forms/recipe-form.context";
import { RECIPE_FORM_SECTIONS } from "../forms/recipe-form.registry";

import { RecipeCreateInput } from "../schemas/recipe.create.schema";
import { getRecipeDraft } from "@/shared/lib/recipe/recipe-draft";
import { FormEditNavigation } from "@/shared/ui/form/FormEditNavigation";

type Props = {
  defaultValues?: RecipeCreateInput;
  onSubmit?: (data: RecipeCreateInput) => void;
  isSubmitting?: boolean;
  mode?: "create" | "edit";
};

export function RecipeForm({
  defaultValues,
  onSubmit: externalSubmit,
  isSubmitting,
  mode = "create",
}: Props) {
  const {
    form,
    onSubmit: internalSubmit,
    isSubmitting: internalSubmitting,
  } = useRecipeForm({
    defaultValues,
    onSubmit: externalSubmit,
    isSubmitting,
  });

  const { handleSubmit, formState, reset } = form;

  // 🔥 якщо є defaultValues (edit) → пріоритет над draft
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      return;
    }

    const draft = getRecipeDraft<RecipeCreateInput>();

    if (draft) {
      reset(draft);
    }
  }, [defaultValues, reset]);

  return (
    <FormProvider {...form}>
      <RecipeFormContext.Provider
        value={{
          form,
          mode,
        }}
      >
        {mode === "edit" && (
          <FormEditNavigation
            confirmTitle="Є незбережені зміни рецепта"
            confirmDescription="Ви впевнені, що хочете покинути сторінку? Зміни рецепта будуть втрачені."
          />
        )}
        <form
          onSubmit={handleSubmit(internalSubmit)}
          className="flex flex-col gap-4"
        >
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
            disabled={internalSubmitting}
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {internalSubmitting
              ? "Збереження..."
              : mode === "edit"
                ? "Зберегти зміни"
                : "Створити рецепт"}
          </button>
        </form>
      </RecipeFormContext.Provider>
    </FormProvider>
  );
}
