import { CategoryNode } from "@/shared/domain/category/category.types";

export type CategoryOption = {
  id: string;
  label: string;
};

export function mapCategoryTreeToOptions(
  tree: CategoryNode[],
): CategoryOption[] {
  const result: CategoryOption[] = [];

  for (const root of tree) {
    result.push({
      id: root.id,
      label: root.name.ua,
    });

    for (const child of root.children ?? []) {
      result.push({
        id: child.id,
        label: `— ${child.name.ua}`,
      });
    }
  }

  return result;
}
