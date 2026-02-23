// export const dynamic = "force-dynamic";

// import { getOrCreateMenuPlan } from "@/lib/menu-plans/menu-plan.service";
// import { getFamilyMembers } from "@/lib/families/family-members.read";
// import { getMealTypes } from "@/lib/meal-types/meal-types.read";
// // import { getWeekStart } from "@/lib/date/getWeekStart";
// import { getMenuPlanFullData } from "@/lib/menu-plans/menu-plans.read";
// import PlanLayout from "@/components/menu-plan/PlanLayout";

// type Props = {
//   searchParams: {
//     date?: string;
//   };
// };

// export default async function PlanPage({ searchParams }: Props) {
//   const today = new Date().toISOString().split("T")[0];
//   const { date: queryDate } = await searchParams;
//   const date = queryDate ?? today;

//   const familyId = "c1d8e7f4-3b29-4a6c-8e15-7f0a2b9d6e33";

//   const plan = await getOrCreateMenuPlan(familyId, date);

//   const fullData = await getMenuPlanFullData(familyId, date);

//   const members = await getFamilyMembers(familyId);
//   const mealTypes = await getMealTypes();

//   return (
//     <PlanLayout
//       planId={plan.menu_plan_id}
//       members={members}
//       mealTypes={mealTypes}
//       entries={fullData?.entries ?? []}
//       activeDate={date}
//       recipesMap={{}}
//       productsMap={{}}
//     />
//   );
// }

// export const dynamic = "force-dynamic";

// import Link from "next/link";
// import { getMenuPlans } from "@/lib/menu-plans/menu-plans.read";

// export default async function MenuPlansPage() {
//   const plans = await getMenuPlans();
//   return (
//     <div className="space-y-4">
//       <h1 className="text-xl font-semibold text-gray-900">Menu plans</h1>

//       <Link
//         href="/admin/menu-plans/new"
//         className="block rounded-xl bg-black text-white p-4 text-center"
//       >
//         ➕ Create menu plan
//       </Link>

//       {plans.length === 0 ? (
//         <div className="rounded-xl border bg-white p-4 text-sm text-gray-500">
//           No menu plans yet.
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {plans.map((plan) => (
//             <Link
//               key={plan.menu_plan_id}
//               href={`/admin/menu-plans/${plan.menu_plan_id}`}
//               className="block rounded-xl border bg-white p-4 hover:bg-gray-50"
//             >
//               <div className="font-medium text-gray-900">
//                 {plan.family_name}
//               </div>
//               <div className="text-sm text-gray-500">
//                 {plan.start_date} → {plan.end_date}
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
