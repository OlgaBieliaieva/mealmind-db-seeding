export const dynamic = "force-dynamic";

import { createMenuPlan } from "../actions";
import { readSheet } from "@/lib/sheets.read";

export default async function NewMenuPlanPage() {
  const rows = await readSheet("families!A2:D");

  const families = rows.map((row) => ({
    family_id: row[0],
    name: row[1],
  }));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Create menu plan</h1>

      <form action={createMenuPlan} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Family</label>
          <select
            name="family_id"
            required
            className="w-full rounded-xl border bg-white p-3"
          >
            <option value="">Select family</option>
            {families.map((family) => (
              <option key={family.family_id} value={family.family_id}>
                {family.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Start date</label>
          <input
            type="date"
            name="start_date"
            required
            className="w-full rounded-xl border bg-white p-3"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">End date</label>
          <input
            type="date"
            name="end_date"
            required
            className="w-full rounded-xl border bg-white p-3"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-black text-white p-4 font-medium"
        >
          Create plan
        </button>
      </form>
    </div>
  );
}
