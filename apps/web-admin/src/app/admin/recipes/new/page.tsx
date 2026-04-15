"use client";

import { RecipeForm } from "@/features/recipe-form/components/RecipeForm";

export default function RecipeCreatePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Створити рецепт</h1>

      <RecipeForm />
    </div>
  );
}
