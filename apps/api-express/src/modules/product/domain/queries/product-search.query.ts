import { PrismaClient, Prisma } from "@prisma/client";

export class ProductSearchQuery {
  constructor(private prisma: PrismaClient) {}

  async searchProducts(
    where: Prisma.ProductWhereInput,
    page: number,
    limit: number,
    options?: {
      includeArchived?: boolean;
    },
  ) {
    if (!options?.includeArchived) {
      where.status = "active";
    }
    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          brand: true,
          category: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return { items, total };
  }

  async searchGeneric(query: string) {
    return this.prisma.product.findMany({
      where: {
        type: "generic",
        OR: [
          { nameEn: { contains: query, mode: "insensitive" } },
          { nameUa: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
      orderBy: { nameEn: "asc" },
      select: {
        id: true,
        nameEn: true,
        nameUa: true,
        categoryId: true,
        rawOrCookedDefault: true,
      },
    });
  }

  async loadCategorySubtreeIds(categoryId: string): Promise<string[]> {
    const ids = [categoryId];

    const children = await this.prisma.category.findMany({
      where: { parentId: categoryId },
      select: { id: true },
    });

    for (const child of children) {
      const childIds = await this.loadCategorySubtreeIds(child.id);
      ids.push(...childIds);
    }

    return ids;
  }
}
