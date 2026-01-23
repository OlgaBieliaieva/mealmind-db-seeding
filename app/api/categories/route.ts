import { readCategories } from "@/lib/categories.read";
import { buildCategoryTree } from "@/lib/categories.tree";

export async function GET() {
  const flat = await readCategories();
  const tree = buildCategoryTree(flat);

  return Response.json({ items: tree });
}
