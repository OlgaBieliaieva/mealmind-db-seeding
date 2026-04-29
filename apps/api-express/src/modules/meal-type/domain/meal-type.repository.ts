import { PrismaClient } from "@prisma/client";

export class MealTypeRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll() {
    return this.prisma.mealType.findMany({
      orderBy: {
        orderIndex: "asc",
      },
    });
  }
}
