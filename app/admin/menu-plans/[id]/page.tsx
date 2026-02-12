export const dynamic = "force-dynamic";

type Props = {
  params: {
    id: string;
  };
};

export default async function MenuPlanDetailsPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Menu plan details</h1>

      <div className="rounded-xl border bg-white p-4 text-sm text-gray-500">
        Plan ID: {id}
      </div>
    </div>
  );
}
