import { UINutrientGroup } from "../types/nutrient.types";

export function mapToUINutrientGroup(
  code: string,
  group: string,
): UINutrientGroup {
  if (
    code === "protein" ||
    code === "fat" ||
    code === "carbohydrates" ||
    code === "energy_kcal"
  )
    return "macros";

  if (
    code === "saturated_fat" ||
    code === "polyunsaturated_fat" ||
    code === "monounsaturated_fat" ||
    code === "cholesterol"
  ) {
    return "fats";
  }

  if (code === "sugar" || code === "fiber") {
    return "carbs";
  }

  // fallback по групі з БД
  switch (group) {
    case "macro":
      return "macros";

    case "vitamin":
      return "vitamins";

    case "mineral":
      return "minerals";

    default:
      return "other";
  }
}
