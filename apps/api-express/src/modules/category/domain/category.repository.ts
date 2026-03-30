import { PrismaClient } from "@prisma/client";

export class CategoryRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll() {
    return this.prisma.category.findMany({
      select: {
        id: true,
        nameEn: true,
        nameUa: true,
        parentId: true,
      },
    });
  }
}
