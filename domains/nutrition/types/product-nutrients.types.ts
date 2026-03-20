export type ProductNutrients = Record<
  string,
  {
    value: number;
    unit: string;
    code?: string;
  }
>;
