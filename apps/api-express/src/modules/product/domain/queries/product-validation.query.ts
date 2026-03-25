import { PrismaClient } from "@prisma/client";

export class ProductValidationQuery {
  constructor(private prisma: PrismaClient) {}

  async categoryExists(id: string): Promise<boolean> {
    const result = await this.prisma.category.findUnique({
      where: { id },
      select: { id: true },
    });

    return !!result;
  }

  async brandExists(id: string): Promise<boolean> {
    const result = await this.prisma.brand.findUnique({
      where: { id },
      select: { id: true },
    });

    return !!result;
  }
}
