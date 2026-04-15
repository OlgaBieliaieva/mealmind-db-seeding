"use client";

import { useFormContext, FieldValues, FieldError } from "react-hook-form";
import { FormFieldConfig } from "./form.types";

type Props<T extends FieldValues> = {
  field: FormFieldConfig<T>;
};

export function FormField<T extends FieldValues>({ field }: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[field.name] as FieldError | undefined;

  const registerOptions =
    field.type === "input" && field.valueType === "number"
      ? {
          setValueAs: (v: unknown) =>
            v === "" || v === null ? undefined : Number(v),
        }
      : undefined;

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{field.label}</label>

      {field.type === "input" && (
        <input
          {...register(field.name, registerOptions)}
          type={field.valueType || "text"}
          placeholder={field.placeholder}
          disabled={field.disabled}
          className="w-full rounded border px-3 py-2"
        />
      )}

      {field.type === "textarea" && (
        <textarea
          {...register(field.name)}
          placeholder={field.placeholder}
          disabled={field.disabled}
          className="w-full rounded border px-3 py-2"
        />
      )}

      {field.type === "select" && (
        <select
          {...register(field.name)}
          disabled={field.disabled}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">Оберіть...</option>

          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}
