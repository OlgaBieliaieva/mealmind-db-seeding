import { PrismaClient } from "@prisma/client";
import { DEMO } from "./seed.constants";

export async function seedUsers(prisma: PrismaClient) {
  console.log("👤 Seeding users...");

  // USERS
  await prisma.user.upsert({
    where: { id: DEMO.users.anna },
    update: {},
    create: {
      id: DEMO.users.anna,
      email: "anna@test.com",
      firstName: "Anna",
      lastName: "Demo",
      sex: "female",
      birthDate: new Date("1995-05-10"),
      onboardingCompleted: true,
    },
  });

  await prisma.user.upsert({
    where: { id: DEMO.users.oleksii },
    update: {},
    create: {
      id: DEMO.users.oleksii,
      email: "oleksii@test.com",
      firstName: "Oleksii",
      lastName: "Demo",
      sex: "male",
      birthDate: new Date("1990-03-15"),
      onboardingCompleted: true,
    },
  });

  // FAMILY
  await prisma.family.upsert({
    where: { id: DEMO.familyId },
    update: {},
    create: {
      id: DEMO.familyId,
      name: "Demo Family",
      createdBy: DEMO.users.anna,
    },
  });

  // MEMBERS
  await prisma.familyMember.upsert({
    where: {
      familyId_userId: {
        familyId: DEMO.familyId,
        userId: DEMO.users.anna,
      },
    },
    update: {},
    create: {
      familyId: DEMO.familyId,
      userId: DEMO.users.anna,
      role: "owner",
    },
  });

  await prisma.familyMember.upsert({
    where: {
      familyId_userId: {
        familyId: DEMO.familyId,
        userId: DEMO.users.oleksii,
      },
    },
    update: {},
    create: {
      familyId: DEMO.familyId,
      userId: DEMO.users.oleksii,
      role: "participant",
    },
  });

  // SETTINGS (тепер працює 💥)
  await prisma.userMealSetting.upsert({
    where: { userId: DEMO.users.anna },
    update: {},
    create: {
      userId: DEMO.users.anna,
      mealsPerDay: 3,
      snacksEnabled: true,
    },
  });

  await prisma.userMealSetting.upsert({
    where: { userId: DEMO.users.oleksii },
    update: {},
    create: {
      userId: DEMO.users.oleksii,
      mealsPerDay: 4,
      snacksEnabled: false,
    },
  });

  console.log("✅ Users seeded");
}
