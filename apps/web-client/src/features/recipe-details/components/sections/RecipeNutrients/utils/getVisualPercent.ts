export function getVisualPercent(value: number) {
  const max = 100;
  return Math.min((value / max) * 100, 100);
}
