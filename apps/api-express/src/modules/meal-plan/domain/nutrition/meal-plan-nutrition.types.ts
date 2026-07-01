import { MealEntryWithRelations } from "../../transport/client/types/meal-plan.types";

export type UserTargetsMap = Record<string, number>;

export type MacroTotals = {
  energyKcal: number;
  protein: number;
  fat: number;
  carbs: number;
};

export type MealDistributionMap = Record<string, number>;

export type UserNutritionContext = {
  user: MealEntryWithRelations["user"];
  targets: UserTargetsMap;
  mealDistribution: MealDistributionMap;
  periodDaysCount: number;
};

export type UserProfileForTargets = {
  sex: "male" | "female";
  birthDate: Date;
  heightCm: number;
  weightKg: number;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active";
  goal: "maintain" | "lose" | "gain";
};
