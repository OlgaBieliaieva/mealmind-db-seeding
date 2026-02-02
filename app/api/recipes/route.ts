import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  // TODO:
  // - validation
  // - persist to DB / Sheets
  // - return recipe_id

  return NextResponse.json({ ok: true });
}
