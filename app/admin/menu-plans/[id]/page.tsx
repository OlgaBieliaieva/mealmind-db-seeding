export const dynamic = "force-dynamic";

import { getMenuPlanDetails } from "@/lib/menu-plans/menu-plan-details.read";
import DaySelector from "@/components/menu-plan/DaySelector";

type Props = {
  params: {
    id: string;
  };
};

export default async function MenuPlanDetailsPage({ params }: Props) {
  const { id } = await params;
  const plan = await getMenuPlanDetails(id);

  if (!plan) {
    return <div className="p-4 text-sm text-red-500">Menu plan not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Menu plan</h1>
        <p className="text-sm text-gray-500">
          {plan.start_date} → {plan.end_date}
        </p>
      </div>

      <DaySelector days={plan.days} />
    </div>
  );
}
