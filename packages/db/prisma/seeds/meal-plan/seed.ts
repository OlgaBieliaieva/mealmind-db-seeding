import { PrismaClient } from "@prisma/client";
import { DEMO } from "../user/seed.constants";

export async function seedMealPlan(prisma: PrismaClient) {
  console.log("🍽 Seeding meal plan...");

  const weekStart = new Date("2026-04-20");

  const plan = await prisma.mealPlan.upsert({
    where: {
      familyId_weekStart: {
        familyId: DEMO.familyId,
        weekStart,
      },
    },
    update: {},
    create: {
      familyId: DEMO.familyId,
      weekStart,
    },
  });

  await prisma.mealEntry.createMany({
    data: [
      {
        mealPlanId: plan.id,
        date: new Date("2026-04-22"),
        userId: DEMO.users.anna,
        mealTypeId: "d6442d6d-11aa-4a86-a612-b0f9c32dd1bb",
        recipeId: "09ea7849-625e-4379-8ac5-e5b6fc0fd11e",
        amount: 200,
      },
      {
        mealPlanId: plan.id,
        date: new Date("2026-04-22"),
        userId: DEMO.users.oleksii,
        mealTypeId: "15bace74-c31d-44ce-a528-d6dafed2ad14",
        recipeId: "e57ef644-e422-4c6b-b9cf-46c38ada90ec",
        amount: 350,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Meal plan seeded");
}
