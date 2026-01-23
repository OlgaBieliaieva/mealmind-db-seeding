import { CategoryNode } from "@/types/category.dto";

type FlatCategory = {
  id: number;
  name_en: string;
  name_ua: string;
  parent_id: number | null;
};

export function buildCategoryTree(categories: FlatCategory[]): CategoryNode[] {
  const map = new Map<number, CategoryNode>();
  const roots: CategoryNode[] = [];

  // init nodes
  for (const c of categories) {
    map.set(c.id, {
      category_id: c.id,
      name: {
        en: c.name_en,
        ua: c.name_ua,
      },
      children: [],
    });
  }

  // build tree
  for (const c of categories) {
    const node = map.get(c.id)!;

    if (c.parent_id) {
      const parent = map.get(c.parent_id);
      parent?.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}
