"use client";

import { FieldValues } from "react-hook-form";
import { FormField } from "./FormField";
import { FormFieldConfig } from "./form.types";

type Props<T extends FieldValues> = {
  fields: FormFieldConfig<T>[];
};

export function FormRenderer<T extends FieldValues>({ fields }: Props<T>) {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <FormField<T> key={field.name} field={field} />
      ))}
    </div>
  );
}
