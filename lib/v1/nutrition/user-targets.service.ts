import { getUserTargets } from "./user-targets.read";
import { createUserTargets } from "./user-targets.write";
import { calculateDefaultTargets } from "./targets.service";
import { readSheet } from "@/lib/v1/sheets.read";
import { UserProfileForTargets } from "./targets.service";

type Sex = "male" | "female";
type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";
type Goal = "maintain" | "lose" | "gain";

function assertSex(value: string): Sex {
  if (value === "male" || value === "female") return value;
  throw new Error(`Invalid sex value: ${value}`);
}

function assertActivityLevel(value: string): ActivityLevel {
  const allowed: ActivityLevel[] = [
    "sedentary",
    "light",
    "moderate",
    "active",
    "very_active",
  ];

  if (allowed.includes(value as ActivityLevel)) {
    return value as ActivityLevel;
  }

  throw new Error(`Invalid activity_level value: ${value}`);
}

function assertGoal(value: string): Goal {
  if (value === "maintain" || value === "lose" || value === "gain") {
    return value;
  }

  throw new Error(`Invalid goal value: ${value}`);
}

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

  const profile: UserProfileForTargets = {
    user_id: userId,
    sex: assertSex(user[5]),
    birth_date: user[6], // має бути ISO
    height_cm: Number(user[7]),
    weight_kg: Number(metrics[2]),
    activity_level: assertActivityLevel(metrics[3]),
    goal: assertGoal(metrics[4]),
  };

  const targets = calculateDefaultTargets(profile);

  await createUserTargets(userId, targets);

  return targets;
}
