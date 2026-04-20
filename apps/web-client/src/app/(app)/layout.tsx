import { ReactNode } from "react";
// import BottomNav from "@/shared/ui/navigation/BottomNav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pb-16">
      {children}
      {/* <BottomNav /> */}
    </div>
  );
}
