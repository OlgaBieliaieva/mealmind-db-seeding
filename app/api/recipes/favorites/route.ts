import { z } from "zod";
import { appendRow } from "@/lib/sheets.helpers";
import { deleteRecipeFavorite } from "@/lib/sheets.helpers";
import { readSheet } from "@/lib/sheets.read";
import { generateUUID } from "@/lib/uuid";

const Schema = z.object({
  recipe_id: z.string().uuid(),
  user_id: z.string().uuid(),
  family_id: z.string().uuid(),
});

/**
 * ➕ Add to favorites
 */
export async function POST(req: Request) {
  const body = await req.json();
  const { recipe_id, user_id, family_id } = Schema.parse(body);

  const now = new Date().toISOString();

  await appendRow("recipe_favorites", [
    generateUUID(),
    recipe_id,
    user_id,
    family_id,
    now,
  ]);

  return Response.json({ ok: true });
}

/**
 * ➖ Remove from favorites
 */
export async function DELETE(req: Request) {
  const body = await req.json();
  const { recipe_id, user_id, family_id } = Schema.parse(body);

  await deleteRecipeFavorite(recipe_id, user_id, family_id);

  return Response.json({ ok: true });
}

/**
 * ⭐ Check is favorite
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const recipe_id = searchParams.get("recipe_id");
  const user_id = searchParams.get("user_id");
  const family_id = searchParams.get("family_id");

  if (!recipe_id || !user_id || !family_id) {
    return Response.json({ isFavorite: false });
  }

  const rows = await readSheet("recipe_favorites!A2:E");

  const isFavorite = rows.some(
    (row) => row[1] === recipe_id && row[2] === user_id && row[3] === family_id,
  );

  return Response.json({ isFavorite });
}
