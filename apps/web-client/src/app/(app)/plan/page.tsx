import { redirect } from "next/navigation";
import PlanHeader from "@/features/meal-plan/components/PlanHeader";

type Props = {
  searchParams: Promise<{
    date?: string;
  }>;
};

export default async function PlanPage({ searchParams }: Props) {
  const params = await searchParams;

  if (!params.date) {
    const today = new Date().toISOString().split("T")[0];
    redirect(`/plan?date=${today}`);
  }

  return (
    <div className="pb-24">
      <PlanHeader />

      {/* тимчасовий контент */}
      <div className="p-4 text-sm text-gray-500">
        Meal plan content coming next...
      </div>
    </div>
  );
}
