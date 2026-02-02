import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // TODO:
  // - validation
  // - persist to DB / Sheets
  // - return recipe_id

  return NextResponse.json({ ok: true });
}
