import { prisma } from "@/lib/db/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
      type: "generic",
    },
    select: {
      id: true,
      nameUa: true,
      nameEn: true,
      categoryId: true,
      rawOrCookedDefault: true,
      unit: true,
      ediblePartPct: true,
      yieldFactor: true,
      cookingLossPct: true,
    },
  });

  if (!product) {
    return Response.json({ message: "Not found" }, { status: 404 });
  }

  return Response.json({
    product_id: product.id,
    name: {
      ua: product.nameUa,
      en: product.nameEn,
    },
    category_id: product.categoryId,
    raw_or_cooked_default: product.rawOrCookedDefault,
    unit: product.unit,
    edible_part_pct: product.ediblePartPct,
    yield_factor: product.yieldFactor,
    cooking_loss_pct: product.cookingLossPct,
  });
}
