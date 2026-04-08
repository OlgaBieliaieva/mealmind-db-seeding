import { PrismaClient } from "@prisma/client";

export class RecipeTypeRepository {
  constructor(private prisma: PrismaClient) {}

  findAll() {
    return this.prisma.recipeType.findMany({
      orderBy: { nameEn: "asc" },
    });
  }
}
