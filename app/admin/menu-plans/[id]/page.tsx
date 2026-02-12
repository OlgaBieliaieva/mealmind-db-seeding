export const dynamic = "force-dynamic";

import { getMenuPlanDetails } from "@/lib/menu-plans/menu-plan-details.read";
import DaySelector from "@/components/menu-plan/DaySelector";
import { getWeekRangeFromDate } from "@/lib/date/week";
import { formatDateDDMMYY } from "@/lib/date/format";

type Props = {
  params: {
    id: string;
  };
};

export default async function MenuPlanDetailsPage({ params }: Props) {
  const { id } = await params;
  const plan = await getMenuPlanDetails(id);

  if (!plan) {
    return <div>Menu plan not found</div>;
  }

  const week = getWeekRangeFromDate(plan.start_date);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-lg font-semibold text-gray-900">Menu planning</h1>
        <p className="text-sm text-gray-500">
          {formatDateDDMMYY(week.start)} — {formatDateDDMMYY(week.end)}
        </p>
      </div>

      <DaySelector days={plan.days} />
    </div>
  );
}
