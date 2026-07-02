"use client";

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import {
  AggregatedMemberDayGroupDTO,
  AggregatedMemberRefDTO,
} from "@/shared/types/meal-plan.types";

import { MemberMealTypeSection } from "./MemberMealTypeSection";
import { MemberNutritionOverview } from "./MemberNutritionOverview";

type Props = {
  day: AggregatedMemberDayGroupDTO;
  member: AggregatedMemberRefDTO;
  defaultExpanded?: boolean;
};

function formatDayLabel(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const safeDate = new Date(Date.UTC(year, month - 1, day));

  return safeDate.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });
}

export function MemberDaySection({
  day,
  member,
  defaultExpanded = false,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const shortMeta = useMemo(() => {
    const mealTypesCount = day.byMealType.length;
    const itemCount = day.summary.totalItems;

    return `${mealTypesCount} прийом(и) їжі • ${itemCount} позицій`;
  }, [day]);

  return (
    <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setIsExpanded((value) => !value)}
        className="block w-full text-left transition hover:bg-gray-50"
      >
        <div className="space-y-2 border-b bg-gray-50 px-4 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="truncate text-sm font-semibold text-gray-900">
                  {formatDayLabel(day.date)}
                </div>

                <ChevronDown
                  size={16}
                  className={`shrink-0 text-gray-400 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </div>

              <div className="mt-1 text-xs text-gray-500">{shortMeta}</div>
            </div>

            <div className="shrink-0 text-right text-xs text-gray-500">
              {day.nutrition ? Math.round(day.nutrition.energyKcal) : 0} ккал
            </div>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="space-y-4 p-3">
          <MemberNutritionOverview
            nutrition={day.nutrition}
            selectedDays={[day.date]}
          />

          {!!day.byMealType.length && (
            <div className="px-1 text-sm font-medium text-gray-900">
              По прийомах їжі
            </div>
          )}

          {day.byMealType.map((group) => (
            <MemberMealTypeSection
              key={`${day.date}-${group.mealType.id}`}
              group={group}
              memberId={member.id}
            />
          ))}

          {!day.byMealType.length && (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500">
              На цей день ще немає запланованих прийомів їжі.
            </div>
          )}
        </div>
      )}
    </section>
  );
}