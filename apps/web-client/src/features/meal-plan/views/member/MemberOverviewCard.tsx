"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

import { AggregatedMemberGroupDTO } from "@/shared/types/meal-plan.types";

import EnergyBattery from "./nutrition/EnergyBattery";

type Props = {
  group: AggregatedMemberGroupDTO;
  onOpen: (memberId: string) => void;
};

const OPEN_DELAY_MS = 120;

function getFallbackBadge(group: AggregatedMemberGroupDTO) {
  if (group.nutrition?.issues?.length) {
    return {
      label: "Є відхилення",
      className: "border-amber-100 bg-amber-50 text-amber-800",
    };
  }

  if (group.summary.totalItems === 0) {
    return {
      label: "Без плану",
      className: "border-gray-200 bg-gray-100 text-gray-600",
    };
  }

  return {
    label: "Мало даних",
    className: "border-gray-200 bg-gray-100 text-gray-600",
  };
}

function getRiskSummary(group: AggregatedMemberGroupDTO) {
  const issuesCount = group.nutrition?.issues?.length ?? 0;

  if (issuesCount > 0) {
    return "Потребує уваги";
  }

  if (group.nutrition?.energyStatus === "balanced") {
    return "Раціон виглядає збалансовано";
  }

  if (group.summary.totalItems === 0) {
    return "Немає запланованих страв";
  }

  return "Оцінка поки неповна";
}

function getVisibleIssues(group: AggregatedMemberGroupDTO) {
  const issues = group.nutrition?.issues ?? [];
  const visible = issues.slice(0, 2);
  const hasMore = issues.length > visible.length;

  return { visible, hasMore };
}

export function MemberOverviewCard({ group, onOpen }: Props) {
  const [isOpening, setIsOpening] = useState(false);

  const { member, nutrition, byMealType } = group;
  const defaultAvatar =
    member.sex === "female"
      ? "/avatars/default-female.jpg"
      : "/avatars/default-male.jpg";

  const fallbackBadge = getFallbackBadge(group);
  const riskSummary = getRiskSummary(group);
  const issues = getVisibleIssues(group);

  const handleOpen = () => {
    if (isOpening) return;

    setIsOpening(true);

    window.setTimeout(() => {
      onOpen(member.id);
    }, OPEN_DELAY_MS);
  };

  return (
    <button
      type="button"
      onClick={handleOpen}
      className={`w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition duration-150 ${
        isOpening
          ? "scale-[0.99] bg-gray-50 shadow-md"
          : "hover:bg-gray-50 hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100">
            <Image
              src={member.avatarUrl || defaultAvatar}
              alt={member.firstName}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="truncate text-base font-medium text-gray-900">
              {member.firstName}
            </div>
            <div className="mt-1 text-sm text-gray-500">
              {byMealType.length} прийом(и) їжі •{" "}
              {nutrition ? Math.round(nutrition.energyKcal) : 0} ккал
            </div>
          </div>
        </div>

        <ChevronRight size={18} className="mt-1 shrink-0 text-gray-300" />
      </div>

      <div className="mt-4">
        {nutrition?.energyPercent !== undefined &&
        nutrition.energyStatus !== undefined ? (
          <div className="w-full">
            <EnergyBattery
              percent={nutrition.energyPercent}
              status={nutrition.energyStatus}
              label="Енергія"
            />
          </div>
        ) : (
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${fallbackBadge.className}`}
          >
            {fallbackBadge.label}
          </span>
        )}
      </div>

      <div className="mt-3 text-sm text-gray-700">{riskSummary}</div>

      {!!issues.visible.length && (
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
          {issues.visible.map((issue) => (
            <span
              key={issue}
              className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-800"
            >
              {issue}
            </span>
          ))}

          {issues.hasMore && (
            <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
              ...
            </span>
          )}
        </div>
      )}
    </button>
  );
}
