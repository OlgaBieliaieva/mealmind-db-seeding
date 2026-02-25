import { differenceInYears } from "date-fns";

type Sex = "male" | "female";
type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

type Goal = "maintain" | "lose" | "gain";

export type UserProfileForTargets = {
  user_id: string;
  sex: Sex;
  birth_date: string; // ISO format: YYYY-MM-DD
  height_cm: number;
  weight_kg: number;
  activity_level: ActivityLevel;
  goal: Goal;
};

export function calculateDefaultTargets(
  profile: UserProfileForTargets,
): Record<string, number> {
  const { sex, birth_date, height_cm, weight_kg, activity_level, goal } =
    profile;

  // =========================
  // 🔹 AGE
  // =========================
  const age = differenceInYears(new Date(), new Date(birth_date));

  // =========================
  // 🔹 BMR — Mifflin-St Jeor
  // =========================
  const bmr =
    sex === "male"
      ? 10 * weight_kg + 6.25 * height_cm - 5 * age + 5
      : 10 * weight_kg + 6.25 * height_cm - 5 * age - 161;

  // =========================
  // 🔹 Activity multiplier
  // =========================
  const activityFactors: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  let tdee = bmr * activityFactors[activity_level];

  // =========================
  // 🔹 Goal adjustment
  // =========================
  if (goal === "lose") {
    tdee *= 0.85; // -15%
  }

  if (goal === "gain") {
    tdee *= 1.12; // +12%
  }

  const energy_kcal = Math.round(tdee);

  // =========================
  // 🔹 Protein
  // =========================
  let proteinPerKg = 1.4;

  if (goal === "lose") proteinPerKg = 1.8;
  if (goal === "gain") proteinPerKg = 1.6;

  const protein = Math.round(weight_kg * proteinPerKg);

  // =========================
  // 🔹 Fat — 30% kcal
  // =========================
  const fat = Math.round((energy_kcal * 0.3) / 9);

  // =========================
  // 🔹 Carbs — remaining kcal
  // =========================
  const proteinKcal = protein * 4;
  const fatKcal = fat * 9;
  const carbsKcal = energy_kcal - (proteinKcal + fatKcal);

  const carbohydrates = Math.round(carbsKcal / 4);

  // =========================
  // 🔹 Sugar — max 10% kcal
  // =========================
  const sugar = Math.round((energy_kcal * 0.1) / 4);

  // =========================
  // 🔹 Fiber — 14g per 1000 kcal
  // =========================
  const fiber = Math.round((energy_kcal / 1000) * 14);

  // =========================
  // 🔹 Sodium — 2000 mg (WHO)
  // =========================
  const sodium = 2000;

  // =========================
  // 🔹 Cholesterol — 300 mg
  // =========================
  const cholesterol = 300;

  return {
    energy_kcal,
    protein,
    fat,
    carbohydrates,
    sugar,
    fiber,
    sodium,
    cholesterol,
  };
}
