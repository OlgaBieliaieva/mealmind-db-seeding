export function getMemberPeriodMeta(
  selectedDays: string[],
  totalItems: number,
) {
  const periodLabel =
    selectedDays.length === 1 ? "1 день" : `${selectedDays.length} днів`;

  return `${periodLabel} • ${totalItems} позицій`;
}

export function isMultiDayPeriod(selectedDays: string[]) {
  return selectedDays.length > 1;
}
