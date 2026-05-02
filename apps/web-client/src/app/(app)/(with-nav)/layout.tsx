import { ReactNode } from "react";
import BottomNav from "@/shared/ui/navigation/BottomNav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-gray-50">
      <main className="flex-1 min-h-0 overflow-hidden px-1 py-1">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
