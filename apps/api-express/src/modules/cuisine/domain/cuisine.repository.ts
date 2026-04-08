import { PrismaClient } from "@prisma/client";

export class CuisineRepository {
  constructor(private prisma: PrismaClient) {}

  findAll() {
    return this.prisma.cuisine.findMany({
      where: { isActive: true },
      orderBy: { nameEn: "asc" },
    });
  }
}
