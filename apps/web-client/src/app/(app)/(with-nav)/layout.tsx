import { ReactNode } from "react";
import BottomNav from "@/shared/ui/navigation/BottomNav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <main className="mx-auto max-w-md px-4 py-4">{children}</main>

      <BottomNav />
    </div>
  );
}
