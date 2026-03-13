import { getNutrientReferences } from "@/domains/nutrition/services/nutrient.service";

export async function GET() {
  try {
    const data = await getNutrientReferences();

    return Response.json(data);
  } catch (e) {
    console.error(e);

    return Response.json({ success: false }, { status: 500 });
  }
}
