import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Адмін-панель</h1>

      <div className="grid gap-4">
        <Link
          href="/admin/products"
          className="block rounded-xl border bg-white p-4 hover:bg-gray-50"
        >
          <div className="text-lg font-medium">📦 Продукти</div>
          <div className="text-sm text-gray-500">
            Управління каталогом продуктів
          </div>
        </Link>

        <Link
          href="/admin/recipes"
          className="block rounded-xl border bg-white p-4 hover:bg-gray-50"
        >
          <div className="text-lg font-medium">🍽 Рецепти</div>
          <div className="text-sm text-gray-500">Управління рецептами</div>
        </Link>

        <Link
          href="/plan"
          className="block rounded-xl border bg-white p-4 hover:bg-gray-50"
        >
          <div className="text-lg font-medium">📅 Планування меню</div>
          <div className="text-sm text-gray-500">Тижневе планування</div>
        </Link>
      </div>
    </div>
  );
}
