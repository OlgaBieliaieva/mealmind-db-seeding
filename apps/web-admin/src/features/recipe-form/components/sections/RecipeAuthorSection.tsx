"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { RecipeCreateInput } from "../../schemas/recipe.create.schema";
import { FormSection } from "@/shared/ui/form/FormSection";

import { useRecipeAuthors } from "@/shared/hooks/useRecipeAuthors";
import { useCreateRecipeAuthor } from "../../hooks/useCreateRecipeAuthor";

import { CreateAuthorInline } from "../inputs/CreateAuthorInline";

import { RECIPE_FORM_SECTION_CONTENT } from "../../forms/recipe.form.labels";

export function RecipeAuthorSection() {
  const { watch, setValue } = useFormContext<RecipeCreateInput>();

  const selectedId = watch("recipe.recipe_author_id") || "";

  const { data: authors = [] } = useRecipeAuthors();

  const [isCreating, setIsCreating] = useState(false);

  const { mutateAsync: createAuthor, isPending } = useCreateRecipeAuthor();

  function handleSelect(value: string) {
    setValue("recipe.recipe_author_id", value === "" ? undefined : value, {
      shouldDirty: true,
    });
  }

  async function handleCreateAuthor(data: {
    display_name: string;
    type: "user" | "blogger" | "system";
    avatar_url?: string | null;
    profile_url?: string | null;
  }) {
    try {
      const created = await createAuthor(data);

      setValue("recipe.recipe_author_id", created.id, {
        shouldDirty: true,
      });

      setIsCreating(false);
    } catch (e) {
      console.error("Failed to create author", e);
    }
  }

  return (
    <FormSection
      title={RECIPE_FORM_SECTION_CONTENT.AUTHOR.title}
      description={RECIPE_FORM_SECTION_CONTENT.AUTHOR.description}
    >
      <div className="space-y-3">
        {/* SELECT */}
        <select
          className="w-full rounded border px-3 py-2"
          value={selectedId}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value="">Без автора</option>

          {authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.display_name} ({a.type})
            </option>
          ))}
        </select>

        {/* TOGGLE CREATE */}
        <button
          type="button"
          onClick={() => setIsCreating((v) => !v)}
          className="text-sm text-blue-600 hover:underline"
        >
          ➕ Додати нового автора
        </button>

        {/* CREATE FORM */}
        {isCreating && (
          <CreateAuthorInline
            isLoading={isPending}
            onCancel={() => setIsCreating(false)}
            onCreate={handleCreateAuthor}
          />
        )}
      </div>
    </FormSection>
  );
}
