import { redirect } from "next/navigation";
import PlanHeader from "@/features/meal-plan/components/PlanHeader";
import PlanControls from "@/features/meal-plan/components/PlanControls";
import PlanContent from "@/features/meal-plan/components/PlanContent";

type Props = {
  searchParams: Promise<{
    date?: string;
    view?: string;
  }>;
};

export default async function PlanPage({ searchParams }: Props) {
  const params = await searchParams;

  const today = new Date().toISOString().split("T")[0];

  const date = params.date ?? today;
  const view = params.view ?? "meal";

  if (!params.date || !params.view) {
    redirect(`/plan?date=${date}&view=${view}`);
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
      <PlanHeader />
      <PlanControls />
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pb-24">
        <PlanContent />
      </div>
    </div>
  );
}
