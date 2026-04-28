import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <main className="mx-auto max-w-md px-1 py-1">{children}</main>
    </div>
  );
}
