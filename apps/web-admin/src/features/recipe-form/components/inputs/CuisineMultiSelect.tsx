"use client";

import { useFormContext } from "react-hook-form";
import { RecipeCreateInput } from "../../schemas/recipe.create.schema";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
};

export function CuisineMultiSelect({ options }: Props) {
  const { watch, setValue } = useFormContext<RecipeCreateInput>();

  const selected = watch("cuisine_ids") || [];

  function toggle(value: string) {
    if (selected.includes(value)) {
      setValue(
        "cuisine_ids",
        selected.filter((v) => v !== value),
      );
    } else {
      setValue("cuisine_ids", [...selected, value]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt.value);

        return (
          <button
            type="button"
            key={opt.value}
            onClick={() => toggle(opt.value)}
            className={`rounded-full border px-3 py-1 text-sm transition
              ${
                active
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700"
              }
            `}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
