export function getWeekStart(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDay(); // 0 Sunday
  const diff = day === 0 ? -6 : 1 - day;

  date.setDate(date.getDate() + diff);

  return date.toISOString().split("T")[0];
}
