export type FormFieldOption = {
  value: string;
  label: string;
};

export type FormFieldConfig<T> = {
  name: keyof T;
  label: string;
  type: "input" | "select" | "textarea";
  options?: FormFieldOption[];
  placeholder?: string;
};