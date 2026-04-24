import { MealPlanDTO } from "./meal-plan.dto";
import { AggregatedMealPlanDTO } from "./aggregated-meal-plan.dto";

export type MealPlanResponseDTO = {
  week: MealPlanDTO;
  aggregated: AggregatedMealPlanDTO;
};
