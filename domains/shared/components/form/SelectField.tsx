"use client";

// SECTION ███ GENERIC SELECT FIELD ███

import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type Props<T extends FieldValues> = {
  label: string;
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  options: Option[];
  error?: string;
};

export function SelectField<T extends FieldValues>({
  label,
  name,
  register,
  options,
  error,
}: Props<T>) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>

      <select
        {...register(name)}
        className="w-full rounded border px-3 py-2 text-sm"
      >
        <option value="">Select...</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
