// SECTION ███ GENERIC PRODUCT SEARCH API ███
// CONTRACT: GET /api/v2/products/generic?query=

import { prisma } from "@/lib/db/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("query")?.trim();

    if (!query || query.length < 2) {
      return Response.json({ items: [] });
    }

    const products = await prisma.product.findMany({
      where: {
        type: "generic",
        OR: [
          {
            nameUa: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            nameEn: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },

      take: 15,

      orderBy: {
        nameUa: "asc",
      },

      select: {
        id: true,
        nameUa: true,
        nameEn: true,
        categoryId: true,
        rawOrCookedDefault: true,
        unit: true,
      },
    });

    return Response.json({
      items: products.map((p) => ({
        product_id: p.id,
        name: {
          ua: p.nameUa,
          en: p.nameEn,
        },
        category_id: p.categoryId,
        raw_or_cooked_default: p.rawOrCookedDefault,
        unit: p.unit,
      })),
    });
  } catch (error) {
    console.error(error);

    return Response.json({ items: [] }, { status: 500 });
  }
}
