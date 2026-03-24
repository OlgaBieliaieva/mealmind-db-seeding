import { Prisma } from "@prisma/client";

export type ProductWithRelations =
  Prisma.ProductGetPayload<{
    include: {
      brand: true;
      category: {
        include: {
          parent: true;
        };
      };
      parentProduct: true;
      nutrients: {
        include: {
          nutrient: true;
        };
      };
      photos: true;
    };
  }>;
  