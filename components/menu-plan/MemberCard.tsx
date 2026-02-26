"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { MealType } from "@/lib/meal-types/meal-types.read";
import { FamilyMember } from "@/lib/families/family-members.read";
import { MenuEntry } from "@/types/menu-entry";
import EnergyBattery from "../nutrition/EnergyBattery";
import MacroSnapshot from "../nutrition/MacroSnapshot";
import { BalanceResult } from "@/types/nutrition-balance";
import { NutritionDisplayItem } from "@/lib/nutrition/nutrition.adapter";
import NutritionDetailsPopover from "../nutrition/NutritionDetailsPopover";
import MealBlock from "./MealBlock";

type Props = {
  planId: string;
  member: FamilyMember;
  mealTypes: MealType[];
  entries: MenuEntry[];
  activeDayId?: string;
  selectedDays: string[];
  isMultiMode: boolean;
  recipesMap: Record<string, string>;
  productsMap: Record<string, string>;
  recipeWeightMap: Record<string, number>;
  productUnitMap: Record<string, string>;
  balance: BalanceResult;
  nutrition: NutritionDisplayItem[];
  targets: Record<string, number>;
  memberMealNutritionMap: Record<
    string,
    Record<number, NutritionDisplayItem[]>
  >;
  memberDishNutritionMap: Record<
    string,
    Record<string, NutritionDisplayItem[]>
  >;
};

export default function MemberCard({
  planId,
  member,
  mealTypes,
  entries,
  activeDayId,
  selectedDays,
  isMultiMode,
  recipesMap,
  productsMap,
  recipeWeightMap,
  productUnitMap,
  balance,
  nutrition,
  targets,
  memberMealNutritionMap,
  memberDishNutritionMap,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? "members";

  const defaultAvatar =
    member.sex === "female"
      ? "/avatars/default-female.jpg"
      : "/avatars/default-male.jpg";

  const src = member.avatar_url || defaultAvatar;

  const periodDays = selectedDays.length;
  const isMulti = periodDays > 1;

  return (
    <div className="rounded-2xl overflow-hidden border bg-white">
      {/* ================= HEADER ================= */}
      <div className="bg-purple-200 px-4 py-3 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src={src}
                alt={member.first_name}
                fill
                className="rounded-full object-cover"
              />
            </div>

            <span className="font-medium text-gray-800">
              {member.first_name}
            </span>
          </div>

          <NutritionDetailsPopover
            nutrition={nutrition}
            balance={balance}
            targets={targets}
            periodDays={periodDays}
            trigger={
              <EnergyBattery
                percent={balance.energyPercent}
                status={balance.status}
              />
            }
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <MacroSnapshot
              protein={balance.macroPercents.protein}
              fat={balance.macroPercents.fat}
              carbs={balance.macroPercents.carbs}
            />

            {isMulti && (
              <div className="text-xs text-gray-500 mt-1">
                ~ середньодобове · За {periodDays} дн.
              </div>
            )}
          </div>

          {balance.issues.length > 0 && (
            <div className="text-xs space-y-1">
              {balance.issues.map((issue, index) => (
                <div key={index} className="text-red-600">
                  ⚠ {issue}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= MEALS ================= */}
      <div className="px-4">
        {mealTypes.map((meal) => {
          const filteredEntries = entries.filter((entry) => {
            const isDateMatch = isMultiMode
              ? selectedDays.includes(entry.date)
              : entry.date === activeDayId;

            return (
              isDateMatch &&
              entry.user_id === member.user_id &&
              entry.meal_type_id === meal.meal_type_id
            );
          });

          // 🔥 Отримуємо нутрієнти meal
          const mealNutrition =
            memberMealNutritionMap[member.user_id]?.[meal.meal_type_id] ?? [];

          const energy =
            mealNutrition.find((n) => n.code === "energy_kcal")?.value ?? 0;

          const protein =
            mealNutrition.find((n) => n.code === "protein")?.value ?? 0;

          const fat = mealNutrition.find((n) => n.code === "fat")?.value ?? 0;

          const carbs =
            mealNutrition.find((n) => n.code === "carbohydrates")?.value ?? 0;

          const totalMacros = protein + fat + carbs;

          const proteinPercent = totalMacros
            ? (protein / totalMacros) * 100
            : 0;

          const fatPercent = totalMacros ? (fat / totalMacros) * 100 : 0;

          const carbsPercent = totalMacros ? (carbs / totalMacros) * 100 : 0;

          return (
            <MealBlock
              key={meal.meal_type_id}
              title={meal.name_ua}
              entries={filteredEntries}
              recipesMap={recipesMap}
              productsMap={productsMap}
              recipeWeightMap={recipeWeightMap}
              productUnitMap={productUnitMap}
              dishNutritionMap={memberDishNutritionMap[member.user_id]}
              macro={{
                energy,
                proteinPercent,
                fatPercent,
                carbsPercent,
              }}
              onAdd={
                isMultiMode
                  ? undefined
                  : () => {
                      if (!activeDayId) return;

                      router.push(
                        `/admin/menu-plans/${planId}/add-entry?date=${activeDayId}&mealTypeId=${meal.meal_type_id}&userId=${member.user_id}&view=${view}`,
                      );
                    }
              }
            />
          );
        })}
      </div>
    </div>
  );
}
