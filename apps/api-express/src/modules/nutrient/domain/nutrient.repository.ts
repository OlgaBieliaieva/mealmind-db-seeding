import { PrismaClient } from "@prisma/client";

export class NutrientQuery {
  constructor(private prisma: PrismaClient) {}

  async getAll() {
    return this.prisma.nutrient.findMany({
      orderBy: { sortOrder: "asc" },
    });
  }
}
