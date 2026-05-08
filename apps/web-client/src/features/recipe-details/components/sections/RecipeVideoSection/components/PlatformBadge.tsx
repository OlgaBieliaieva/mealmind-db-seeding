import { getPlatformLabel } from "../utils/getPlatformLable";

export function PlatformBadge({ platform }: { platform: string }) {
  const label = getPlatformLabel(platform);

  return (
    <div className="text-[11px] px-2 py-[2px] rounded-full bg-gray-100 text-gray-600">
      {label}
    </div>
  );
}
