import { z } from "zod";
import { appendRow, deleteRowsByRecipeId } from "@/lib/sheets.helpers";
import { generateUUID } from "@/lib/uuid";

const Schema = z.object({
  recipe_id: z.string().uuid(),
  links: z.array(
    z.object({
      platform: z.enum(["instagram", "youtube", "tiktok", "website", "other"]),
      url: z.string().url(),
    }),
  ),
});

export async function POST(req: Request) {
  const body = await req.json();
  const { recipe_id, links } = Schema.parse(body);

  await deleteRowsByRecipeId("author_links", recipe_id);

  const rows = links.map((link) => [
    generateUUID(), // author_link_id
    recipe_id,
    link.platform,
    link.url,
  ]);

  for (const row of rows) {
    await appendRow("author_links", row);
  }

  return Response.json({ ok: true });
}
