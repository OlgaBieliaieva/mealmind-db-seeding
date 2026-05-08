"use client";

import { RecipeDetailsDTO } from "@/features/recipe-details/types/recipe-details.types";
import { SectionTitle } from "./components/SectionTitle";
import { StepItem } from "./components/StepItem";

export function RecipeSteps({ recipe }: { recipe: RecipeDetailsDTO }) {
  const steps = [...recipe.steps].sort((a, b) => a.stepNumber - b.stepNumber);

  return (
    <div className="mt-4 space-y-5 pb-16">
      <SectionTitle>Кроки ({steps.length})</SectionTitle>

      <div className="space-y-3">
        {steps.map((step) => (
          <StepItem key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}
