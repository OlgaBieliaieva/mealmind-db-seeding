import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { MealType } from "@/lib/meal-types/meal-types.read";
import { FamilyMember } from "@/lib/families/family-members.read";
import MealBlock from "./MealBlock";
import { MenuEntry } from "@/types/menu-entry";
import EnergyBattery from "../nutrition/EnergyBattery";
import MacroSnapshot from "../nutrition/MacroSnapshot";
import { BalanceResult } from "@/types/nutrition-balance";

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
}: Props) {
  const router = useRouter();
  const defaultAvatar =
    member.sex === "female"
      ? "/avatars/default-female.jpg"
      : "/avatars/default-male.jpg";

  const src = member.avatar_url || defaultAvatar;

  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? "members";

  return (
    <div className="rounded-2xl overflow-hidden border bg-white">
      {/* Header */}
      <div className="bg-purple-200  px-4 py-3 space-y-3">
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
          <EnergyBattery
            percent={balance.energyPercent}
            status={balance.status}
          />
        </div>
        <div className="flex justify-between items-center">
          <MacroSnapshot
            protein={balance.macroPercents.protein}
            fat={balance.macroPercents.fat}
            carbs={balance.macroPercents.carbs}
          />
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

      {/* Meals */}
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

          return (
            <MealBlock
              key={meal.meal_type_id}
              title={meal.name_ua}
              entries={filteredEntries}
              recipesMap={recipesMap}
              productsMap={productsMap}
              recipeWeightMap={recipeWeightMap}
              productUnitMap={productUnitMap}
              onAdd={() => {
                if (!activeDayId) return;

                router.push(
                  `/admin/menu-plans/${planId}/add-entry?date=${activeDayId}&mealTypeId=${meal.meal_type_id}&userId=${member.user_id}&view=${view}`,
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
