import MemberCard from "./MemberCard";
import { FamilyMember } from "@/lib/families/family-members.read";
import { MealType } from "@/lib/meal-types/meal-types.read";

type Props = {
  members: FamilyMember[];
  mealTypes: MealType[];
};

export default function ByMembersLayout({ members, mealTypes }: Props) {
  return (
    <div className="space-y-4">
      {members.map((member) => (
        <MemberCard
          key={member.user_id}
          first_name={member.first_name}
          avatar_url={member.avatar_url}
          sex={member.sex}
          mealTypes={mealTypes}
        />
      ))}
    </div>
  );
}
