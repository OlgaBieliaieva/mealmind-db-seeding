import { z } from "zod";
import { appendRow } from "@/lib/v1/sheets.helpers";
import { deleteProductFavorite } from "@/lib/v1/sheets.helpers";
import { readSheet } from "@/lib/v1/sheets.read";
import { generateUUID } from "@/domains/shared/utils/uuid";

const Schema = z.object({
  product_id: z.string(),
  user_id: z.string().uuid(),
  family_id: z.string().uuid(),
});

/**
 * ➕ Add to favorites (idempotent)
 */
export async function POST(req: Request) {
  const body = await req.json();
  const { product_id, user_id, family_id } = Schema.parse(body);

  const rows = await readSheet("product_favorites!A2:E");

  const exists = rows.some(
    (row) =>
      row[1] === product_id && row[2] === user_id && row[3] === family_id,
  );

  if (exists) {
    return Response.json({ ok: true, already: true });
  }

  const now = new Date().toISOString();

  await appendRow("product_favorites", [
    generateUUID(),
    product_id,
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
  const { product_id, user_id, family_id } = Schema.parse(body);

  await deleteProductFavorite(product_id, user_id, family_id);

  return Response.json({ ok: true });
}

/**
 * ⭐ Check is favorite
 */
// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);

//   const user_id = searchParams.get("user_id");
//   const family_id = searchParams.get("family_id");

//   if (!user_id || !family_id) {
//     return Response.json({ items: {} });
//   }

//   const rows = await readSheet("recipe_favorites!A2:E");

//   const map: Record<string, boolean> = {};

//   for (const row of rows) {
//     if (row[2] === user_id && row[3] === family_id) {
//       map[row[1]] = true; // recipe_id
//     }
//   }

//   return Response.json({ items: map });
// }

/**
 * ⭐ Get favorites map
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const user_id = searchParams.get("user_id");
  const family_id = searchParams.get("family_id");

  if (!user_id || !family_id) {
    return Response.json({ map: {} });
  }

  const rows = await readSheet("product_favorites!A2:E");

  const map: Record<string, boolean> = {};

  rows.forEach((row) => {
    if (row[2] === user_id && row[3] === family_id) {
      map[row[1]] = true; // recipe_id
    }
  });

  return Response.json({ map });
}
