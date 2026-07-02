"use client";

import { useMemo, useRef, useState } from "react";

import { AggregatedMemberViewDTO } from "@/shared/types/meal-plan.types";
import { useMealPlanActions } from "@/features/meal-plan/hooks/useMealPlanActions";
import { usePlanParams } from "@/features/meal-plan/hooks/usePlanParams";
import { PlanFloatingActionButton } from "@/features/meal-plan/shared/components/PlanFloatingActionButton";

import { FamilyMembersOverview } from "@/features/meal-plan/views/member/FamilyMembersOverview";
import { MemberOverviewCard } from "@/features/meal-plan/views/member/MemberOverviewCard";
import { MemberSectionCard } from "@/features/meal-plan/views/member/MemberSectionCard";
import { MemberTabs } from "@/features/meal-plan/views/member/MemberTabs";

type Props = {
  aggregated: AggregatedMemberViewDTO;
};

export function MemberView({ aggregated }: Props) {
  const { selectedDays } = usePlanParams();
  const actions = useMealPlanActions();
  const [activeMemberId, setActiveMemberId] = useState("all");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleChangeMember = (memberId: string) => {
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveMemberId(memberId);
  };

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

  const handleAdd = () => {
    actions.openCreate({
      memberId: activeMemberId === "all" ? undefined : activeMemberId,
    });
  };

  return (
    <div ref={containerRef} className="space-y-4 pb-20">
      <MemberTabs
        tabs={tabs}
        active={activeMemberId}
        onChange={handleChangeMember}
      />

      {activeMember ? (
        <MemberSectionCard
          member={activeMember.member}
          summary={activeMember.summary}
          nutrition={activeMember.nutrition}
          byMealType={activeMember.byMealType}
          byDay={activeMember.byDay}
          selectedDays={selectedDays}
        />
      ) : (
        <>
          <FamilyMembersOverview members={aggregated.members} />

          <div className="space-y-3">
            {aggregated.members.map((group) => (
              <MemberOverviewCard
                key={group.member.id}
                group={group}
                onOpen={handleChangeMember}
              />
            ))}
          </div>
        </>
      )}
      <PlanFloatingActionButton onClick={handleAdd} />
    </div>
  );
}
