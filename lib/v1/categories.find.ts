import { CategoryNode } from "@/types/category.dto";

export function findCategoryById(
  nodes: CategoryNode[],
  id?: number,
): CategoryNode | undefined {
  if (!id) return undefined;

  for (const node of nodes) {
    if (node.category_id === id) return node;

    const found = findCategoryById(node.children, id);
    if (found) return found;
  }

  return undefined;
}
