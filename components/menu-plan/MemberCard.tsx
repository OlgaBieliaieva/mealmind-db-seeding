import Image from "next/image";
import { MealType } from "@/lib/meal-types/meal-types.read";
import MealBlock from "./MealBlock";
import { MenuEntry } from "@/types/menu-entry";

type Props = {
  first_name: string;
  avatar_url?: string | null;
  sex?: "male" | "female" | null;
  mealTypes: MealType[];
  entries: MenuEntry[];
};

export default function MemberCard({
  first_name,
  avatar_url,
  sex,
  mealTypes,
  entries,
}: Props) {
  const defaultAvatar =
    sex === "female"
      ? "/avatars/default-female.jpg"
      : "/avatars/default-male.jpg";

  const src = avatar_url || defaultAvatar;

  return (
    <div className="rounded-2xl overflow-hidden border bg-white">
      {/* Header */}
      <div className="bg-purple-200 px-4 py-3 flex items-center gap-3">
        <div className="relative w-8 h-8">
          <Image
            src={src}
            alt={first_name}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <span className="font-medium text-gray-800">{first_name}</span>
      </div>

      {/* Meals */}
      <div className="px-4">
        {mealTypes.map((meal) => (
          <MealBlock
            key={meal.meal_type_id}
            title={meal.name_ua}
            entries={entries}
          />
        ))}
      </div>
    </div>
  );
}
