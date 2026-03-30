"use client";

import { FieldValues, useFormContext } from "react-hook-form";

import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { TextareaField } from "./TextareaField";

import { FormRendererProps } from "@/features/product-form/forms/form.types";

export function FormRenderer<T extends FieldValues>({
  fields,
}: FormRendererProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const error = errors[field.name]?.message as string | undefined;

        switch (field.type) {
          case "input":
            return (
              <InputField
                key={field.name}
                label={field.label}
                name={field.name}
                register={register}
                error={error}
                placeholder={field.placeholder}
              />
            );

          case "select":
            return (
              <SelectField
                key={field.name}
                label={field.label}
                name={field.name}
                register={register}
                options={field.options}
                error={error}
              />
            );

          case "textarea":
            return (
              <TextareaField
                key={field.name}
                label={field.label}
                name={field.name}
                register={register}
                error={error}
                placeholder={field.placeholder}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
