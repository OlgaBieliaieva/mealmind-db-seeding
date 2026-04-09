"use client";

import { FieldValues, Path } from "react-hook-form";
import { FormField } from "./FormField";

type Props<T extends FieldValues> = {
  fields: {
    name: Path<T>;
    label: string;
    type: "input" | "select" | "textarea";
    options?: { value: string; label: string }[];
    placeholder?: string;
    disabled?: boolean;
  }[];
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

// "use client";

// import { FieldValues } from "react-hook-form";
// import { FormField } from "./FormField";
// import { FormField as FormFieldType } from "./form.types";

// type Props<T extends FieldValues> = {
//   fields: FormFieldType<T>[];
// };

// export function FormRenderer<T extends FieldValues>({ fields }: Props<T>) {
//   return (
//     <div className="space-y-4">
//       {fields.map((field, index) => (
//         <FormField<T> key={`${field.name}-${index}`} field={field} />
//       ))}
//     </div>
//   );
// }