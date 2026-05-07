import {
  NutrientDTO,
  NutrientGroupDTO,
} from "@/features/recipe-details/types/recipe-details.types";

export function groupByNutrientGroup(
  nutrients: NutrientDTO[],
): NutrientGroupDTO[] {
  const groups: Record<string, NutrientDTO[]> = {};

  for (const n of nutrients) {
    const key = n.uiGroup;

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(n);
  }

  return Object.entries(groups).map(([group, items]) => ({
    group,
    items: items.sort((a, b) => a.sortOrder - b.sortOrder),
  }));
}
