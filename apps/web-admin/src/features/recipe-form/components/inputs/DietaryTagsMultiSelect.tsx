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

export function DietaryTagsMultiSelect({ options }: Props) {
  const { watch, setValue } = useFormContext<RecipeCreateInput>();

  const selected = watch("dietary_tag_ids") || [];

  function toggle(value: string) {
    if (selected.includes(value)) {
      setValue(
        "dietary_tag_ids",
        selected.filter((v) => v !== value),
      );
    } else {
      setValue("dietary_tag_ids", [...selected, value]);
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
                  ? "bg-green-600 text-white border-green-600"
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
