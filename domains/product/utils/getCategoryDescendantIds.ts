import { prisma } from "@/lib/db/prisma";

export async function getCategoryDescendantIds(
  categoryId: string,
): Promise<string[]> {
  const all = await prisma.category.findMany({
    select: {
      id: true,
      parentId: true,
    },
  });

  const map = new Map<string, string[]>();

  for (const c of all) {
    if (!c.parentId) continue;

    if (!map.has(c.parentId)) {
      map.set(c.parentId, []);
    }

    map.get(c.parentId)!.push(c.id);
  }

  const result: string[] = [];

  function dfs(id: string) {
    result.push(id);

    const children = map.get(id) ?? [];

    for (const child of children) {
      dfs(child);
    }
  }

  dfs(categoryId);

  return result;
}
