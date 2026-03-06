// SECTION ███ CATEGORY TREE BUILDER ███
// WHY: convert flat category list → tree

import { Category, CategoryNode } from "@/domains/shared/types/category.types";

export function buildCategoryTree(categories: Category[]): CategoryNode[] {
  const map = new Map<string, CategoryNode>();

  const roots: CategoryNode[] = [];

  // create nodes
  for (const c of categories) {
    map.set(c.id, {
      id: c.id,
      name: {
        en: c.nameEn,
        ua: c.nameUa,
      },
      children: [],
    });
  }

  // build tree
  for (const c of categories) {
    const node = map.get(c.id)!;

    if (!c.parentId) {
      roots.push(node);
      continue;
    }

    const parent = map.get(c.parentId);

    if (parent) {
      parent.children.push(node);
    }
  }

  return roots;
}
