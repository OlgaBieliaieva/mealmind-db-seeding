import MemberCard from "./MemberCard";
import { FamilyMember } from "@/lib/families/family-members.read";
import { MealType } from "@/lib/meal-types/meal-types.read";
import { MenuEntry } from "@/types/menu-entry";

type Props = {
  members: FamilyMember[];
  mealTypes: MealType[];
  entries: MenuEntry[];
  activeDayId?: string;
  recipesMap: Record<string, string>;
  productsMap: Record<string, string>;
};

export default function ByMembersLayout({
  members,
  mealTypes,
  entries,
  activeDayId,
  recipesMap,
  productsMap,
}: Props) {
  return (
    <div className="space-y-4">
      {members.map((member) => (
        <MemberCard
          key={member.user_id}
          member={member}
          mealTypes={mealTypes}
          entries={entries}
          activeDayId={activeDayId}
          recipesMap={recipesMap}
          productsMap={productsMap}
        />
      ))}
    </div>
  );
}
