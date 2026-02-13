import Image from "next/image";
import { useRouter } from "next/navigation";
import { MealType } from "@/lib/meal-types/meal-types.read";
import { FamilyMember } from "@/lib/families/family-members.read";
import MealBlock from "./MealBlock";
import { MenuEntry } from "@/types/menu-entry";

type Props = {
  planId: string;
  member: FamilyMember;
  mealTypes: MealType[];
  entries: MenuEntry[];
  activeDayId?: string;
  recipesMap: Record<string, string>;
  productsMap: Record<string, string>;
};

export default function MemberCard({
  planId,
  member,
  mealTypes,
  entries,
  activeDayId,
  recipesMap,
  productsMap,
}: Props) {
  const router = useRouter();
  const defaultAvatar =
    member.sex === "female"
      ? "/avatars/default-female.jpg"
      : "/avatars/default-male.jpg";

  const src = member.avatar_url || defaultAvatar;

  return (
    <div className="rounded-2xl overflow-hidden border bg-white">
      {/* Header */}
      <div className="bg-purple-200 px-4 py-3 flex items-center gap-3">
        <div className="relative w-8 h-8">
          <Image
            src={src}
            alt={member.first_name}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <span className="font-medium text-gray-800">{member.first_name}</span>
      </div>

      {/* Meals */}
      <div className="px-4">
        {mealTypes.map((meal) => {
          const filteredEntries = entries.filter(
            (entry) =>
              entry.menu_day_id === activeDayId &&
              entry.user_id === member.user_id &&
              entry.meal_type_id === meal.meal_type_id,
          );

          return (
            <MealBlock
              key={meal.meal_type_id}
              title={meal.name_ua}
              entries={filteredEntries}
              recipesMap={recipesMap}
              productsMap={productsMap}
              onAdd={() => {
                if (!activeDayId) return;

                router.push(
                  `/admin/menu-plans/${planId}/add-entry?dayId=${activeDayId}&mealTypeId=${meal.meal_type_id}&userId=${member.user_id}`,
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
