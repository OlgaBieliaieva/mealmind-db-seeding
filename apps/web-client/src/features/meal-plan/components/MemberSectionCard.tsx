"use client";

import Image from "next/image";

import { MemberMealTypeSection } from "./MemberMealTypeSection";
import { MemberNutritionCard } from "./MemberNutritionCard";
import EnergyBattery from "./nutrition/EnergyBattery";

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
  compact?: boolean;
};

export function MemberSectionCard({
  member,
  summary,
  nutrition,
  byMealType,
  compact = false,
}: Props) {
  const defaultAvatar =
    member.sex === "female"
      ? "/avatars/default-female.jpg"
      : "/avatars/default-male.jpg";

  const progress =
    summary.totalItems === 0 ? 0 : summary.preparedItems / summary.totalItems;

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
                {byMealType.length} прийом(и) їжі • {summary.totalItems} позицій
              </div>
            </div>
          </div>

          {nutrition?.energyPercent !== undefined &&
          nutrition.energyStatus !== undefined ? (
            <div className="w-28 shrink-0">
              <EnergyBattery
                percent={nutrition.energyPercent}
                status={nutrition.energyStatus}
                label="Енергія"
              />
            </div>
          ) : (
            <div className="w-20 shrink-0">
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 p-3">
        <MemberNutritionCard nutrition={nutrition} compact={compact} />

        {compact ? (
          <div className="flex flex-wrap gap-2">
            {byMealType.map((group) => (
              <span
                key={group.mealType.id}
                className="rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs text-green-800"
              >
                {group.mealType.name}:{" "}
                {Math.round(group.nutrition?.energyKcal ?? 0)} ккал
              </span>
            ))}
          </div>
        ) : (
          byMealType.map((group) => (
            <MemberMealTypeSection
              key={group.mealType.id}
              group={group}
              memberId={member.id}
            />
          ))
        )}
      </div>
    </section>
  );
}
