import { prisma } from "@/lib/db/prisma";

export async function getNutrientReferences() {
  const rows = await prisma.nutrient.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });

  return rows.map((r) => ({
    nutrient_id: r.id,

    code: r.code,

    name: {
      en: r.nameEn,

      ua: r.nameUa,
    },

    default_unit: r.defaultUnit,

    nutrient_group: r.nutrientGroup,

    sort_order: r.sortOrder,

    rda_value: r.rdaValue,

    rda_unit: r.rdaUnit,
  }));
}
