"use client";

export function FoodActionButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed bottom-4 left-4 right-4">
      <button
        onClick={onClick}
        className="w-full bg-green-500 text-white py-4 rounded-2xl shadow-lg"
      >
        + Додати
      </button>
    </div>
  );
}
