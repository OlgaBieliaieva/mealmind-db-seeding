import { mapToUINutrientGroup } from "../mappers/nutrient-ui-map";
import { UINutrientGroup } from "../types/nutrient.types";

type NutrientRow = {
  nutrient: {
    code: string;
    nameUa: string;
    nameEn: string;
    nutrientGroup: string;
    sortOrder: number;
  };
  valuePer100g: number;
  unit?: string | null;
};

export type NutrientDTO = {
  code: string;
  name: string;
  value: number;
  unit: string;
  group: string;
  sortOrder: number;
  uiGroup: UINutrientGroup;
};

export function presentNutrient(n: NutrientRow): NutrientDTO {
  return {
    code: n.nutrient.code,
    name: n.nutrient.nameUa,
    value: n.valuePer100g,
    unit: n.unit ?? "g",

    group: n.nutrient.nutrientGroup,
    sortOrder: n.nutrient.sortOrder,

    uiGroup: mapToUINutrientGroup(n.nutrient.code, n.nutrient.nutrientGroup),
  };
}
