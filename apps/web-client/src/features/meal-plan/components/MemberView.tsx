"use client";

import { useMemo, useRef, useState } from "react";

import { AggregatedMemberViewDTO } from "@/shared/types/meal-plan.types";

import { usePlanParams } from "../hooks/usePlanParams";

import { FamilyMembersOverview } from "./FamilyMembersOverview";
import { MemberOverviewCard } from "./MemberOverviewCard";
import { MemberSectionCard } from "./MemberSectionCard";
import { MemberTabs } from "./MemberTabs";

type Props = {
  aggregated: AggregatedMemberViewDTO;
};

export function MemberView({ aggregated }: Props) {
  const { selectedDays } = usePlanParams();
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
    </div>
  );
}
