import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo / Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">
            Family Meal Planner
          </h1>
          <p className="text-sm text-gray-500">
            Плануйте харчування швидко та зручно
          </p>
        </div>

        {/* Navigation cards */}
        <div className="space-y-4">
          <Link
            href="/plan"
            className="block rounded-2xl bg-white border p-5 hover:shadow-md transition"
          >
            <div className="text-lg font-medium text-gray-800">
              📅 План харчування
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Перегляд та редагування тижневого меню
            </div>
          </Link>

          <Link
            href="/admin"
            className="block rounded-2xl bg-white border p-5 hover:shadow-md transition"
          >
            <div className="text-lg font-medium text-gray-800">
              ⚙️ Адмін панель
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Управління продуктами та рецептами
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
