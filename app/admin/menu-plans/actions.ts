"use server";

import { redirect } from "next/navigation";
import { appendMenuPlan } from "@/lib/menu-plans.write";

export async function createMenuPlan(formData: FormData) {
  const family_id = formData.get("family_id") as string;
  const start_date = formData.get("start_date") as string;
  const end_date = formData.get("end_date") as string;

  if (!family_id || !start_date || !end_date) {
    throw new Error("Missing required fields");
  }

  const menu_plan_id = crypto.randomUUID();
  const created_at = new Date().toISOString();

  await appendMenuPlan([
    menu_plan_id,
    family_id,
    start_date,
    end_date,
    "draft",
    created_at,
  ]);

  redirect("/admin/menu-plans");
}
