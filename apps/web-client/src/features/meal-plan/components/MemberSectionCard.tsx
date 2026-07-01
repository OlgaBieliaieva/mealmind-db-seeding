"use client";

import Image from "next/image";

import {
  AggregatedMemberMealTypeGroupDTO,
  AggregatedMemberRefDTO,
  AggregatedNutritionSnapshotDTO,
  AggregatedSummaryDTO,
} from "@/shared/types/meal-plan.types";

import { InfoTooltip } from "./InfoTooltip";
import { MemberMealTypeSection } from "./MemberMealTypeSection";
import { MemberNutritionOverview } from "./MemberNutritionOverview";

type Props = {
  member: AggregatedMemberRefDTO;
  summary: AggregatedSummaryDTO;
  nutrition?: AggregatedNutritionSnapshotDTO;
  byMealType: AggregatedMemberMealTypeGroupDTO[];
  selectedDays: string[];
};

export function MemberSectionCard({
  member,
  summary,
  nutrition,
  byMealType,
  selectedDays,
}: Props) {
  const defaultAvatar =
    member.sex === "female"
      ? "/avatars/default-female.jpg"
      : "/avatars/default-male.jpg";

  return (
    <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="space-y-3 border-b bg-gray-50 px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
              <Image
                src={member.avatarUrl || defaultAvatar}
                alt={member.firstName}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="truncate font-medium text-gray-900">
                {member.firstName}
              </div>
              <div className="text-xs text-gray-500">
                {selectedDays.length === 1 ? "1 день" : `${selectedDays.length} днів`} •{" "}
                {byMealType.length} прийом(и) їжі • {summary.totalItems} позицій
              </div>
            </div>
          </div>

          <InfoTooltip
            title="Профіль члена родини"
            description="Тут показано загальну оцінку плану для конкретної людини, а нижче - деталізацію по прийомах їжі."
            align="right"
            side="bottom"
          />
        </div>
      </div>

      <div className="space-y-4 p-3">
        <MemberNutritionOverview
          nutrition={nutrition}
          selectedDays={selectedDays}
        />

        {!!byMealType.length && (
          <div className="px-1 text-sm font-medium text-gray-900">
            По прийомах їжі
          </div>
        )}

        {byMealType.map((group) => (
          <MemberMealTypeSection
            key={group.mealType.id}
            group={group}
            memberId={member.id}
          />
        ))}

        {!byMealType.length && (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500">
            У вибраному періоді ще немає запланованих прийомів їжі для цього
            члена родини.
          </div>
        )}
      </div>
    </section>
  );
}
