import { Prisma } from "@prisma/client";

export function buildProductSearchWhere(
  base: Prisma.ProductWhereInput,
  query?: string,
): Prisma.ProductWhereInput {
  if (!query || query.trim().length < 2) {
    return base;
  }

  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  return {
    ...base,

    AND: tokens.map((token) => ({
      OR: [
        {
          nameUa: {
            contains: token,
            mode: "insensitive",
          },
        },
        {
          nameEn: {
            contains: token,
            mode: "insensitive",
          },
        },

        {
          brand: {
            nameUa: {
              contains: token,
              mode: "insensitive",
            },
          },
        },
        {
          brand: {
            nameEn: {
              contains: token,
              mode: "insensitive",
            },
          },
        },
      ],
    })),
  };
}
