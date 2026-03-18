export function ProductDetailsHeaderCard() {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl font-semibold">Product Name</div>

          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-200 rounded" />
            <div className="h-6 w-16 bg-gray-200 rounded" />
            <div className="h-6 w-16 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="h-9 w-20 bg-gray-200 rounded" />
          <div className="h-9 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
