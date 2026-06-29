"use client";

import { MealSummary } from "./MealSummary";
import { MemberSectionCard } from "./MemberSectionCard";
import { AggregatedMemberViewDTO } from "@/shared/types/meal-plan.types";

type Props = {
  aggregated: AggregatedMemberViewDTO;
};

export function MemberView({ aggregated }: Props) {
  return (
    <div className="space-y-4 pb-20">
      <MealSummary
        total={aggregated.summary.totalItems}
        prepared={aggregated.summary.preparedItems}
      />

      <div className="space-y-3">
        {aggregated.members.map((group) => (
          <MemberSectionCard
            key={group.member.id}
            member={group.member}
            summary={group.summary}
            nutrition={group.nutrition}
            byMealType={group.byMealType}
          />
        ))}
      </div>
    </div>
  );
}
