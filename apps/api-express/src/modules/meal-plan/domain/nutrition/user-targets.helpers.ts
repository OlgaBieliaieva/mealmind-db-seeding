import { differenceInYears } from "date-fns";
import { MealPlanUser } from "../../transport/client/types/meal-plan.types";
import {
  UserProfileForTargets,
  UserTargetsMap,
  ControlledNutrientDefinition,
} from "./meal-plan-nutrition.types";

const CORE_TARGET_CODES = new Set([
  "energy_kcal",
  "protein",
  "fat",
  "carbohydrates",
]);

const DEFAULT_CONTROLLED_NUTRIENTS: Record<
  string,
  { name: string; unit: string; direction: "min" | "max" | "target" }
> = {
  sugar: { name: "Цукор", unit: "г", direction: "max" },
  fiber: { name: "Клітковина", unit: "г", direction: "min" },
  sodium: { name: "Натрій", unit: "мг", direction: "max" },
  cholesterol: { name: "Холестерин", unit: "мг", direction: "max" },
};

export function getControlledNutrientDefinitions(
  user: MealPlanUser,
): ControlledNutrientDefinition[] {
  const resolvedTargets = resolveUserTargets(user);

  const stored = user.nutrientTargets
    .filter((target) => !CORE_TARGET_CODES.has(target.nutrient.code))
    .map((target) => ({
      code: target.nutrient.code,
      name: target.nutrient.nameUa,
      unit: target.nutrient.defaultUnit,
      direction:
        DEFAULT_CONTROLLED_NUTRIENTS[target.nutrient.code]?.direction ??
        "target",
      targetValue: resolvedTargets[target.nutrient.code],
    }));

  const fallback = Object.entries(DEFAULT_CONTROLLED_NUTRIENTS)
    .filter(([code]) => !stored.find((item) => item.code === code))
    .filter(([code]) => resolvedTargets[code] !== undefined)
    .map(([code, meta]) => ({
      code,
      name: meta.name,
      unit: meta.unit,
      direction: meta.direction,
      targetValue: resolvedTargets[code],
    }));

  return [...stored, ...fallback];
}

function buildStoredTargetsMap(user: MealPlanUser): UserTargetsMap {
  if (!user.nutrientTargets?.length) {
    return {};
  }

  return Object.fromEntries(
    user.nutrientTargets.map((target) => [
      target.nutrient.code,
      target.targetValue,
    ]),
  );
}

function buildProfileForTargets(
  user: MealPlanUser,
): UserProfileForTargets | undefined {
  const latestMetric = user.bodyMetrics?.[0];

  if (!latestMetric) return undefined;
  if (!user.birthDate || !user.heightCm) return undefined;

  return {
    sex: user.sex,
    birthDate: user.birthDate,
    heightCm: user.heightCm,
    weightKg: latestMetric.weightKg,
    activityLevel: latestMetric.activityLevel,
    goal: latestMetric.goal,
  };
}

function calculateDefaultTargets(
  profile: UserProfileForTargets,
): UserTargetsMap {
  const age = differenceInYears(new Date(), profile.birthDate);

  const bmr =
    profile.sex === "male"
      ? 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * age + 5
      : 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * age - 161;

  const activityFactors: Record<
    UserProfileForTargets["activityLevel"],
    number
  > = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  let tdee = bmr * activityFactors[profile.activityLevel];

  if (profile.goal === "lose") {
    tdee *= 0.85;
  }

  if (profile.goal === "gain") {
    tdee *= 1.12;
  }

  const energy_kcal = Math.round(tdee);

  let proteinPerKg = 1.6;

  if (profile.goal === "lose") proteinPerKg = 1.8;
  if (profile.goal === "gain") proteinPerKg = 1.6;

  const protein = Math.round(profile.weightKg * proteinPerKg);
  const fat = Math.round((energy_kcal * 0.3) / 9);

  const proteinKcal = protein * 4;
  const fatKcal = fat * 9;
  const carbsKcal = energy_kcal - (proteinKcal + fatKcal);
  const carbohydrates = Math.round(carbsKcal / 4);

  const sugar = Math.round((energy_kcal * 0.1) / 4);
  const fiber = 30;
  // Math.round((energy_kcal / 1000) * 14);
  const sodium = 2000;
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

function buildDefaultTargetsMap(user: MealPlanUser): UserTargetsMap {
  const profile = buildProfileForTargets(user);

  if (!profile) {
    return {};
  }

  return calculateDefaultTargets(profile);
}

export function resolveUserTargets(user: MealPlanUser): UserTargetsMap {
  const storedTargets = buildStoredTargetsMap(user);

  if (Object.keys(storedTargets).length > 0) {
    return storedTargets;
  }

  return buildDefaultTargetsMap(user);
}
