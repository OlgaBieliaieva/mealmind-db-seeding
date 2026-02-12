import { FamilyMember } from "@/lib/families/family-members.read";
import { MealType } from "@/lib/meal-types/meal-types.read";

type Props = {
  members: FamilyMember[];
  mealTypes: MealType[];
};

export default function ByMealsLayout({ members, mealTypes }: Props) {
  return (
    <div className="space-y-4">
      {mealTypes.map((meal) => (
        <div
          key={meal.meal_type_id}
          className="rounded-2xl overflow-hidden border bg-white"
        >
          <div className="bg-green-200 px-4 py-3">{meal.name_ua}</div>

          <div className="px-4">
            {members.map((member) => (
              <div
                key={member.user_id}
                className="border-t py-3 text-sm text-gray-600"
              >
                {member.first_name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
