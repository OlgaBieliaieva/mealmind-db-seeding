import { FieldPath, FieldValues } from "react-hook-form";

export type FormFieldOption = {
  value: string;
  label: string;
};

export type InputFieldConfig<T extends FieldValues> = {
  type: "input";
  valueType?: "text" | "number";
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

export type FormFieldConfig<T extends FieldValues> =
  | InputFieldConfig<T>
  | SelectFieldConfig<T>
  | TextareaFieldConfig<T>;
