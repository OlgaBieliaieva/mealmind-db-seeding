"use client";

import { useMemo, useState } from "react";

import { MemberTabs } from "./MemberTabs";
import { MemberViewSummary } from "./MemberViewSummary";
import { MemberSectionCard } from "./MemberSectionCard";

import { AggregatedMemberViewDTO } from "@/shared/types/meal-plan.types";

type Props = {
  aggregated: AggregatedMemberViewDTO;
};

export function MemberView({ aggregated }: Props) {
  const [activeMemberId, setActiveMemberId] = useState("all");

  const tabs = useMemo(
    () => [
      { id: "all", name: "Всі" },
      ...aggregated.members.map((group) => ({
        id: group.member.id,
        name: group.member.firstName,
      })),
    ],
    [aggregated.members],
  );

  const activeMember =
    activeMemberId === "all"
      ? null
      : aggregated.members.find((group) => group.member.id === activeMemberId);

  return (
    <div className="space-y-4 pb-20">
      <MemberTabs
        tabs={tabs}
        active={activeMemberId}
        onChange={setActiveMemberId}
      />

      {activeMember ? (
        <>
          <MemberViewSummary
            mode="single"
            memberName={activeMember.member.firstName}
            summary={activeMember.summary}
            nutrition={activeMember.nutrition}
            mealTypesCount={activeMember.byMealType.length}
          />

          <MemberSectionCard
            member={activeMember.member}
            summary={activeMember.summary}
            nutrition={activeMember.nutrition}
            byMealType={activeMember.byMealType}
          />
        </>
      ) : (
        <>
          <MemberViewSummary
            mode="all"
            members={aggregated.members}
            summary={aggregated.summary}
          />

          <div className="space-y-3">
            {aggregated.members.map((group) => (
              <MemberSectionCard
                key={group.member.id}
                member={group.member}
                summary={group.summary}
                nutrition={group.nutrition}
                byMealType={group.byMealType}
                compact
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
