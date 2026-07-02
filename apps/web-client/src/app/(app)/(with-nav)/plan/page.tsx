import { redirect } from "next/navigation";

import PlanScreen from "@/features/meal-plan/shell/PlanScreen";

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

  return <PlanScreen />;
}
