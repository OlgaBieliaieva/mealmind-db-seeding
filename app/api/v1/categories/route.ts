import { readCategories } from "@/lib/v1/categories.read";
import { buildCategoryTree } from "@/lib/v1/categories.tree";

export async function GET() {
  const flat = await readCategories();
  const tree = buildCategoryTree(flat);

  return Response.json({ items: tree });
}
