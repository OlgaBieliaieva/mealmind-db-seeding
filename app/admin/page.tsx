import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Admin panel</h1>

      <div className="grid gap-4">
        <Link
          href="/admin/products/new"
          className="block rounded-xl border bg-white p-4 hover:bg-gray-50"
        >
          <div className="text-lg font-medium">➕ Add product</div>
          <div className="text-sm text-gray-500">
            Add a branded or generic product
          </div>
        </Link>

        <Link
          href="/admin/recipes/new"
          className="block rounded-xl border bg-white p-4 hover:bg-gray-50"
        >
          <div className="text-lg font-medium">🍽 Add recipe</div>
          <div className="text-sm text-gray-500">Add your recipes</div>
        </Link>

        <Link
          href="/admin/recipes"
          className="block rounded-xl border bg-white p-4 hover:bg-gray-50"
        >
          <div className="text-lg font-medium">📋 Recipes</div>
          <div className="text-sm text-gray-500">View and manage recipes</div>
        </Link>

        <Link
          href="/admin/menu-plans"
          className="block rounded-xl border bg-white p-4 hover:bg-gray-50"
        >
          <div className="text-lg font-medium">📅 Menu plans</div>
          <div className="text-sm text-gray-500">
            Create and manage weekly family plans
          </div>
        </Link>
      </div>
    </div>
  );
}
