export function TimerBadge({ seconds }: { seconds: number }) {
  const minutes = Math.ceil(seconds / 60);

  return (
    <div className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full w-fit">
      ⏱ min {minutes} хв
    </div>
  );
}
