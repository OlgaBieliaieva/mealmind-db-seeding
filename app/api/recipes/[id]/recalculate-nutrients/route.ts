import { NextRequest, NextResponse } from "next/server";
import { recalculateRecipeNutrients } from "@/lib/recipes/recipe-nutrients.cache";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    await recalculateRecipeNutrients(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to recalculate nutrients" },
      { status: 500 },
    );
  }
}
