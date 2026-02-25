import MemberCard from "./MemberCard";
import { FamilyMember } from "@/lib/families/family-members.read";
import { MealType } from "@/lib/meal-types/meal-types.read";
import { MenuEntry } from "@/types/menu-entry";
import { BalanceResult } from "@/types/nutrition-balance";

type Props = {
  planId: string;
  members: FamilyMember[];
  mealTypes: MealType[];
  entries: MenuEntry[];
  activeDayId?: string;
  selectedDays: string[];
  isMultiMode: boolean;
  recipesMap: Record<string, string>;
  productsMap: Record<string, string>;
  recipeWeightMap: Record<string, number>;
  productUnitMap: Record<string, string>;
  memberBalanceMap: Record<string, BalanceResult>;
};

export default function ByMembersLayout({
  planId,
  members,
  mealTypes,
  entries,
  activeDayId,
  selectedDays,
  isMultiMode,
  recipesMap,
  productsMap,
  recipeWeightMap,
  productUnitMap,
  memberBalanceMap,
}: Props) {
  return (
    <div className="space-y-4">
      {members.map((member) => (
        <MemberCard
          key={member.user_id}
          planId={planId}
          member={member}
          mealTypes={mealTypes}
          entries={entries}
          activeDayId={activeDayId}
          selectedDays={selectedDays}
          isMultiMode={isMultiMode}
          recipesMap={recipesMap}
          productsMap={productsMap}
          recipeWeightMap={recipeWeightMap}
          productUnitMap={productUnitMap}
          balance={memberBalanceMap[member.user_id]}
        />
      ))}
    </div>
  );
}
