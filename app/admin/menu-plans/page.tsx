export const dynamic = "force-dynamic";

import Link from "next/link";
import { getMenuPlans } from "@/lib/menu-plans/menu-plans.read";

export default async function MenuPlansPage() {
  const plans = await getMenuPlans();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Menu plans</h1>

      <Link
        href="/admin/menu-plans/new"
        className="block rounded-xl bg-black text-white p-4 text-center"
      >
        ➕ Create menu plan
      </Link>

      {plans.length === 0 ? (
        <div className="rounded-xl border bg-white p-4 text-sm text-gray-500">
          No menu plans yet.
        </div>
      ) : (
        <div className="space-y-3">
          {plans.map((plan) => (
            <Link
              key={plan.menu_plan_id}
              href={`/admin/menu-plans/${plan.menu_plan_id}`}
              className="block rounded-xl border bg-white p-4 hover:bg-gray-50"
            >
              <div className="font-medium text-gray-900">
                {plan.family_name}
              </div>
              <div className="text-sm text-gray-500">
                {plan.start_date} → {plan.end_date}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
