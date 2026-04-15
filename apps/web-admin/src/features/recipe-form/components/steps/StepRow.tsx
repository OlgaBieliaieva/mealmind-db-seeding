"use client";

import { useFormContext } from "react-hook-form";
import { RecipeCreateInput } from "../../schemas/recipe.create.schema";

type Props = {
  index: number;
  onRemove: () => void;
};

export function StepRow({ index, onRemove }: Props) {
  const { register } = useFormContext<RecipeCreateInput>();

  return (
    <div className="flex flex-col gap-2 border rounded p-3">
      {/* STEP NUMBER */}
      <div className="text-sm text-gray-500">Крок {index + 1}</div>

      {/* INSTRUCTION */}
      <textarea
        {...register(`steps.${index}.instruction`)}
        placeholder="Опис дії..."
        className="border rounded px-3 py-2 text-sm"
      />

      {/* TIMER (optional) */}
      {/* <input
        type="number"
        {...register(`steps.${index}.timer_sec`, {
          valueAsNumber: true,
        })}
        placeholder="Таймер (сек)"
        className="border rounded px-3 py-2 text-sm w-40"
      /> */}

      {/* REMOVE */}
      <button
        type="button"
        onClick={onRemove}
        className="text-red-500 text-sm self-end"
      >
        Видалити
      </button>
    </div>
  );
}
