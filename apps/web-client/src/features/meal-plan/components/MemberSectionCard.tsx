"use client";

import Image from "next/image";
import { MemberMealTypeSection } from "./MemberMealTypeSection";
import {
  AggregatedMemberMealTypeGroupDTO,
  AggregatedMemberRefDTO,
  AggregatedNutritionSnapshotDTO,
  AggregatedSummaryDTO,
} from "@/shared/types/meal-plan.types";

type Props = {
  member: AggregatedMemberRefDTO;
  summary: AggregatedSummaryDTO;
  nutrition?: AggregatedNutritionSnapshotDTO;
  byMealType: AggregatedMemberMealTypeGroupDTO[];
};

export function MemberSectionCard({
  member,
  summary,
  nutrition,
  byMealType,
}: Props) {
  const defaultAvatar =
    member.sex === "female"
      ? "/avatars/default-female.jpg"
      : "/avatars/default-male.jpg";

  const progress =
    summary.totalItems === 0 ? 0 : summary.preparedItems / summary.totalItems;

  return (
    <section className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-4 border-b bg-gray-50 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
              <Image
                src={member.avatarUrl || defaultAvatar}
                alt={member.firstName}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="font-medium text-gray-900 truncate">
                {member.firstName}
              </div>
              <div className="text-xs text-gray-500">
                {summary.preparedItems}/{summary.totalItems} готово
              </div>
            </div>
          </div>

          <div className="w-20 shrink-0">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {nutrition && (
          <div className="flex flex-wrap gap-2 text-xs text-gray-600">
            <span className="rounded-full bg-white px-2.5 py-1 border">
              {Math.round(nutrition.energyKcal)} ккал
            </span>
            <span className="rounded-full bg-white px-2.5 py-1 border">
              Б {nutrition.protein.toFixed(0)} г
            </span>
            <span className="rounded-full bg-white px-2.5 py-1 border">
              Ж {nutrition.fat.toFixed(0)} г
            </span>
            <span className="rounded-full bg-white px-2.5 py-1 border">
              В {nutrition.carbs.toFixed(0)} г
            </span>
          </div>
        )}
      </div>

      <div className="p-3 space-y-3">
        {byMealType.map((group) => (
          <MemberMealTypeSection
            key={group.mealType.id}
            group={group}
            memberId={member.id}
          />
        ))}
      </div>
    </section>
  );
}
