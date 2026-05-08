export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
      {children}
    </div>
  );
}