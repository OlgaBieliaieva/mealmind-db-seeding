import { Nutrient } from "@prisma/client";

export function presentNutrientReference(n: Nutrient) {
  return {
    nutrient_id: n.id,
    code: n.code,
    name: {
      en: n.nameEn,
      ua: n.nameUa,
    },
    default_unit: n.defaultUnit,
    nutrient_group: n.nutrientGroup,
    sort_order: n.sortOrder,
    rda_value: n.rdaValue,
    rda_unit: n.rdaUnit,
  };
}
