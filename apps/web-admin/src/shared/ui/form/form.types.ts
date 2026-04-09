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

// import { FieldValues, Path } from "react-hook-form";

// export type FormField<T extends FieldValues> = {
//   name: Path<T>;
//   label: string;

//   type: "input" | "select" | "textarea";

//   inputType?: "text" | "number";

//   options?: {
//     value: string;
//     label: string;
//   }[];

//   placeholder?: string;
//   disabled?: boolean;
// };
