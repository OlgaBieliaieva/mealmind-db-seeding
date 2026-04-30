import { Prisma } from "@prisma/client";

export function buildRecipeSearchWhere(
  base: Prisma.RecipeWhereInput,
  query?: string,
): Prisma.RecipeWhereInput {
  if (!query || query.trim().length < 2) {
    return base;
  }

  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  return {
    ...base,

    AND: tokens.map((token) => ({
      OR: [
        {
          title: {
            contains: token,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: token,
            mode: "insensitive",
          },
        },
        {
          ingredients: {
            some: {
              product: {
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
                ],
              },
            },
          },
        },
      ],
    })),
  };
}
