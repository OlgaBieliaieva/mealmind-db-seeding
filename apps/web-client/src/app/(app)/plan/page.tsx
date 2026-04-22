import { redirect } from "next/navigation";
import PlanHeader from "@/features/meal-plan/components/PlanHeader";
import PlanContent from "@/features/meal-plan/components/PlanContent";

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

      <PlanContent />
    </div>
  );
}
