import Link from "next/link";

export default function MenuPlansPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Menu plans</h1>

      <Link
        href="/admin/menu-plans/new"
        className="block rounded-xl bg-black text-white p-4 text-center"
      >
        ➕ Create menu plan
      </Link>

      <div className="text-sm text-gray-500">No menu plans yet.</div>
    </div>
  );
}
