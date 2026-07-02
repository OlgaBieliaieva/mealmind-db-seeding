export function formatMemberDayLabel(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const safeDate = new Date(Date.UTC(year, month - 1, day));

  return safeDate.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });
}

export function formatMemberDayShortMeta(
  mealTypesCount: number,
  itemsCount: number,
) {
  return `${mealTypesCount} прийом(и) їжі • ${itemsCount} позицій`;
}
