export function StepNumber({ number }: { number: number }) {
  return (
    <div className="w-7 h-7 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xs font-semibold">
      {number}
    </div>
  );
}
