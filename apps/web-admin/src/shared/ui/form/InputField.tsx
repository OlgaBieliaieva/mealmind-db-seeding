"use client";

// SECTION ███ GENERIC INPUT FIELD ███

import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  error?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
};

export function InputField<T extends FieldValues>({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  disabled,
}: Props<T>) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        disabled={disabled}
        className="w-full rounded border px-3 py-2 text-sm"
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
