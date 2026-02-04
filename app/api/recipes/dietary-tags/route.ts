import { z } from "zod";
import { appendRows, deleteRowsByRecipeId } from "@/lib/sheets.helpers";

const Schema = z.object({
  recipe_id: z.string().uuid(),
  dietary_tag_ids: z.array(z.number()),
});

export async function POST(req: Request) {
  const body = await req.json();
  const { recipe_id, dietary_tag_ids } = Schema.parse(body);

  await deleteRowsByRecipeId("recipe_dietary_tags", recipe_id);

  const now = new Date().toISOString();

  const rows = dietary_tag_ids.map((id) => [recipe_id, id, now]);

  if (rows.length > 0) {
    await appendRows("recipe_dietary_tags", rows);
  }

  return Response.json({ ok: true });
}
