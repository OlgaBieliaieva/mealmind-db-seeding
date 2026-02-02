"use client";

import { RecipeStepDraft } from "@/types/recipe-step";

type Props = {
  step: RecipeStepDraft;
  onChange: (next: RecipeStepDraft) => void;
  onRemove: () => void;
};

export function StepRow({ step, onChange, onRemove }: Props) {
  return (
    <div className="flex gap-2 items-start">
      {/* Order */}
      <div className="pt-2 text-sm text-gray-500 w-6">{step.order}.</div>

      {/* Text */}
      <textarea
        className="flex-1 rounded border px-3 py-2"
        placeholder="Опишіть дію (наприклад: залити вівсянку водою)"
        value={step.text}
        onChange={(e) =>
          onChange({
            ...step,
            text: e.target.value,
          })
        }
      />

      {/* Remove */}
      <button
        type="button"
        onClick={onRemove}
        className="pt-2 text-red-600"
        aria-label="Видалити крок"
      >
        ✕
      </button>
    </div>
  );
}
