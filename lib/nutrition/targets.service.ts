import {
  UserProfileForTargets,
  UserNutritionTargets,
  ActivityLevel,
  Goal,
} from "@/types/user-targets";

function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

function calculateBMR(profile: UserProfileForTargets): number {
  const age = calculateAge(profile.birth_date);

  if (profile.sex === "male") {
    return 10 * profile.weight_kg + 6.25 * profile.height_cm - 5 * age + 5;
  }

  return 10 * profile.weight_kg + 6.25 * profile.height_cm - 5 * age - 161;
}

function getActivityMultiplier(level: ActivityLevel): number {
  const map: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  return map[level];
}

function applyGoalAdjustment(calories: number, goal: Goal): number {
  if (goal === "lose") return calories - 300;
  if (goal === "gain") return calories + 300;
  return calories;
}

export function calculateDefaultTargets(
  profile: UserProfileForTargets,
): UserNutritionTargets {
  const bmr = calculateBMR(profile);
  const tdee = bmr * getActivityMultiplier(profile.activity_level);
  const adjustedCalories = applyGoalAdjustment(tdee, profile.goal);

  const totalCalories = Math.round(adjustedCalories);

  const proteinPerKg = profile.goal === "maintain" ? 1.6 : 2.0;

  const protein = Math.round(profile.weight_kg * proteinPerKg);
  const fat = Math.round(profile.weight_kg * 0.8);

  const proteinKcal = protein * 4;
  const fatKcal = fat * 9;

  const remainingKcal = totalCalories - proteinKcal - fatKcal;
  const carbs = Math.max(0, Math.round(remainingKcal / 4));

  const fiber = Math.round((totalCalories / 1000) * 14);

  return {
    calories: totalCalories,
    protein_g: protein,
    fat_g: fat,
    carbs_g: carbs,
    fiber_g: fiber,
  };
}
