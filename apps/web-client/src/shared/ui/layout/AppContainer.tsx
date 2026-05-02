"use client";

export function AppContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full justify-center overflow-hidden bg-gray-100">
      <div className="relative flex h-full w-full max-w-md flex-col overflow-hidden bg-white">
        {children}
      </div>
    </div>
  );
}
