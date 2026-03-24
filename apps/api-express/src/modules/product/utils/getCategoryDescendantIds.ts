import { PrismaClient } from "@prisma/client";

export async function getCategoryDescendantIds(
  prisma: PrismaClient,
  categoryId: string,
): Promise<string[]> {
  const ids = [categoryId];

  const children = await prisma.category.findMany({
    where: { parentId: categoryId },
    select: { id: true },
  });

  for (const child of children) {
    const childIds = await getCategoryDescendantIds(prisma, child.id);
    ids.push(...childIds);
  }

  return ids;
}
