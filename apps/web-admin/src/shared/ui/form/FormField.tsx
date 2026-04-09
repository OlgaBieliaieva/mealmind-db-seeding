"use client";

import { useFormContext, FieldValues, Path, FieldError } from "react-hook-form";

type Props<T extends FieldValues> = {
  field: {
    valueType?: string;
    name: Path<T>;
    label: string;
    type: "input" | "select" | "textarea";
    options?: { value: string; label: string }[];
    placeholder?: string;
    disabled?: boolean;
  };
};

export function FormField<T extends FieldValues>({ field }: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[field.name] as FieldError | undefined;
  return (
    <div className="space-y-1">
      {/* LABEL */}
      <label className="text-sm font-medium">{field.label}</label>

      {/* INPUT TYPES */}
      {field.type === "input" && (
        <input
          {...register(field.name)}
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

      {/* ERROR */}
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}
