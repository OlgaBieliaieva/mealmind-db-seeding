import { PrismaClient } from "@prisma/client";

export class BrandRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll() {
    return this.prisma.brand.findMany({
      select: {
        id: true,
        nameEn: true,
        nameUa: true,
        country: true,
      },
      orderBy: {
        nameEn: "asc",
      },
    });
  }
}