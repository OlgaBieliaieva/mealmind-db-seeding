"use client";

import { AggregatedMemberGroupDTO } from "@/shared/types/meal-plan.types";

import { InfoTooltip } from "@/features/meal-plan/shared/components/InfoTooltip";

type Props = {
  members: AggregatedMemberGroupDTO[];
};

type MetricCardProps = {
  value: number;
  label: string;
  tone?: "neutral" | "success" | "warning";
  tooltipTitle: string;
  tooltipDescription: string;
  tooltipAlign?: "left" | "right";
  tooltipSide?: "top" | "bottom";
};

function MetricCard({
  value,
  label,
  tone = "neutral",
  tooltipTitle,
  tooltipDescription,
  tooltipAlign = "right",
  tooltipSide = "bottom",
}: MetricCardProps) {
  const toneClass =
    tone === "success"
      ? "bg-green-50"
      : tone === "warning"
        ? "bg-amber-50"
        : "bg-gray-50";

  return (
    <div className={`rounded-xl p-3 ${toneClass}`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="text-xs text-gray-500">{label}</div>
        <InfoTooltip
          title={tooltipTitle}
          description={tooltipDescription}
          align={tooltipAlign}
          side={tooltipSide}
        />
      </div>

      <div className="text-lg font-semibold text-gray-900">{value}</div>
    </div>
  );
}

export function FamilyMembersOverview({ members }: Props) {
  const totalMembers = members.length;
  const withPlannedMeals = members.filter(
    (member) => member.summary.totalItems > 0,
  ).length;
  const membersWithIssues = members.filter(
    (member) => (member.nutrition?.issues?.length ?? 0) > 0,
  ).length;
  const balancedMembers = members.filter(
    (member) => member.nutrition?.energyStatus === "balanced",
  ).length;

  return (
    <div className="space-y-3 rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium text-gray-900">Огляд родини</div>
        <InfoTooltip
          title="Огляд родини"
          description="Коротке порівняння загального стану плану по всіх членах родини без занурення в деталі кожної людини."
          align="right"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          value={totalMembers}
          label="Членів родини"
          tooltipTitle="Членів родини"
          tooltipDescription="Скільки людей зараз входить у план і відображається в аналітичному режимі."
          tooltipAlign="left"
          tooltipSide="bottom"
        />

        <MetricCard
          value={withPlannedMeals}
          label="Мають план"
          tooltipTitle="Мають план"
          tooltipDescription="Скільки членів родини мають хоча б одну заплановану позицію в обраному періоді."
          tooltipAlign="right"
          tooltipSide="bottom"
        />

        <MetricCard
          value={membersWithIssues}
          label="Потребують уваги"
          tone="warning"
          tooltipTitle="Потребують уваги"
          tooltipDescription="Скільки членів родини мають nutrition issues щодо енергії або макронутрієнтів."
          tooltipAlign="left"
          tooltipSide="top"
        />

        <MetricCard
          value={balancedMembers}
          label="У межах балансу"
          tone="success"
          tooltipTitle="У межах балансу"
          tooltipDescription="Скільки членів родини зараз мають збалансований план без критичних відхилень."
          tooltipAlign="right"
          tooltipSide="top"
        />
      </div>
    </div>
  );
}
