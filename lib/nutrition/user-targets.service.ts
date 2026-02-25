import { getUserTargets } from "./user-targets.read";
import { createUserTargets } from "./user-targets.write";
import { calculateDefaultTargets } from "./targets.service";
import { readSheet } from "@/lib/sheets.read";
import {
  ActivityLevel,
  Goal,
  UserProfileForTargets,
} from "@/types/user-targets";

export async function getOrCreateUserTargets(userId: string) {
  const existing = await getUserTargets(userId);
  if (existing) return existing;

  const userRows = await readSheet("users!A2:J");
  const metricsRows = await readSheet("user_body_metrics!A2:H");

  const user = userRows.find((r) => r[0] === userId);
  const metrics = metricsRows.find((r) => r[1] === userId);

  if (!user || !metrics) {
    throw new Error("User profile incomplete");
  }

  // 🔥 Runtime type narrowing

  const sex = user[4];
  if (sex !== "male" && sex !== "female") {
    throw new Error(`Invalid sex value: ${sex}`);
  }

  const activity = metrics[3] as string;
  const validActivities: ActivityLevel[] = [
    "sedentary",
    "light",
    "moderate",
    "active",
    "very_active",
  ];

  if (!validActivities.includes(activity as ActivityLevel)) {
    throw new Error(`Invalid activity_level: ${activity}`);
  }

  const goal = metrics[4] as string;
  const validGoals: Goal[] = ["maintain", "lose", "gain"];

  if (!validGoals.includes(goal as Goal)) {
    throw new Error(`Invalid goal: ${goal}`);
  }

  const profile: UserProfileForTargets = {
    user_id: userId,
    sex,
    birth_date: user[5],
    height_cm: Number(user[6]),
    weight_kg: Number(metrics[2]),
    activity_level: activity as ActivityLevel,
    goal: goal as Goal,
  };

  const targets = calculateDefaultTargets(profile);
  await createUserTargets(userId, targets);

  return targets;
}
