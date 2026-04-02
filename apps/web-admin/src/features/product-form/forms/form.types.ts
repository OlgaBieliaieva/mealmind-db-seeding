// SECTION ███ SHARED FORM TYPES ███

import { FieldPath, FieldValues } from "react-hook-form";

export type FormFieldOption = {
  value: string;
  label: string;
};

export type InputFieldConfig<T extends FieldValues> = {
  type: "input";
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
};

export type SelectFieldConfig<T extends FieldValues> = {
  type: "select";
  name: FieldPath<T>;
  label: string;
  options: FormFieldOption[];
  disabled?: boolean;
};

export type TextareaFieldConfig<T extends FieldValues> = {
  type: "textarea";
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
};

export type FormField<T extends FieldValues> =
  | InputFieldConfig<T>
  | SelectFieldConfig<T>
  | TextareaFieldConfig<T>;

export type FormRendererProps<T extends FieldValues> = {
  fields: FormField<T>[];
};
