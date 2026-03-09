// SECTION ███ CATEGORIES API ███

import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    include: {
      children: true,
    },

    orderBy: {
      nameUa: "asc",
    },
  });
  if (!categories) {
    console.log("категорії не знайдено");
  }
  return Response.json(categories);
}
