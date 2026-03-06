import { CategoryNode } from "@/domains/shared/types/category.types";

export function findCategoryById(
  nodes: CategoryNode[],
  id?: number,
): CategoryNode | undefined {
  if (!id) return undefined;

  // for (const node of nodes) {
  //   if (node.id === id) return node;

  //   const found = findCategoryById(node.children, id);
  //   if (found) return found;
  // }

  return undefined;
}
