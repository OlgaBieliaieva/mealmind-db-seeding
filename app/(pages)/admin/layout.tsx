import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-xl px-4 py-3 flex items-center gap-4">
          <Link href="/admin" className="text-lg font-semibold text-gray-900">
            MealMind Admin
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-6">{children}</main>
    </div>
  );
}
