"use client";

import { useFormContext } from "react-hook-form";
import { RecipeCreateInput } from "../../schemas/recipe.create.schema";

type Props = {
  index: number;
  onRemove: () => void;
};

export function IngredientRow({ index, onRemove }: Props) {
  const { watch, register } = useFormContext<RecipeCreateInput>();

  const ingredient = watch(`ingredients.${index}`);

  return (
    <div className="w-full grid grid-cols-[160px_80px_20px] flex items-center justify-between border px-4 py-3 rounded hover:bg-gray-50 gap-1">
      {/* LEFT */}
      <div className="flex flex-col ">
        <div className="font-medium">{ingredient.product_name}</div>
        <div className="text-xs text-gray-500">
          {ingredient.product_brand ?? "—"}
        </div>
      </div>
      <div className="flex items-center ">
        <input
          type="number"
          {...register(`ingredients.${index}.quantity_g`, {
            valueAsNumber: true,
          })}
          className="w-full border rounded px-2 py-1 text-base font-semibold"
        />

        <span className="text-sm text-gray-500">{ingredient.product_unit}</span>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex justify-end">
        {/* EDIT */}
        {/* <Link
          href={`/admin/products/select/${ingredient.product_id}?mode=edit&index=${index}`}
          className="text-sm text-blue-500"
        >
          ✏️
        </Link> */}

        {/* REMOVE */}
        <button type="button" onClick={onRemove} className="text-red-500">
          ✕
        </button>
      </div>
    </div>
  );
}
