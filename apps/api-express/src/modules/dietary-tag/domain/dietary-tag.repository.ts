import { PrismaClient } from "@prisma/client";

export class DietaryTagRepository {
  constructor(private prisma: PrismaClient) {}

  findAll() {
    return this.prisma.dietaryTag.findMany({
      where: { isActive: true },
      orderBy: { nameEn: "asc" },
    });
  }
}
