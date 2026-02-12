export function generateDateRange(start: string, end: string): string[] {
  const dates: string[] = [];

  const startDate = new Date(start);
  const endDate = new Date(end);

  const current = new Date(startDate);

  while (current <= endDate) {
    dates.push(current.toISOString().split("T")[0]);

    current.setDate(current.getDate() + 1);
  }

  return dates;
}
