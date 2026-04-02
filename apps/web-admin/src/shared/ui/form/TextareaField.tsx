"use client";

// SECTION ███ GENERIC TEXTAREA FIELD ███

import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
};

export function TextareaField<T extends FieldValues>({
  label,
  name,
  register,
  error,
  placeholder,
  disabled
}: Props<T>) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>

      <textarea
        placeholder={placeholder}
        {...register(name)}
        disabled={disabled}
        className="w-full rounded border px-3 py-2 text-sm"
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
