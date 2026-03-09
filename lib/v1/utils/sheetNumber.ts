export function parseSheetNumber(value: unknown): number | null {
  if (typeof value !== "string" && typeof value !== "number") return null;

  const normalized = String(value).replace(",", ".");
  const num = Number(normalized);

  return Number.isFinite(num) ? num : null;
}
