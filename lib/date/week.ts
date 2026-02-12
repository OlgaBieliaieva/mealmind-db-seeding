export function getWeekRangeFromDate(dateString: string) {
  const date = new Date(dateString);

  const dayOfWeek = (date.getDay() + 6) % 7; // convert Sunday=0 to 6

  const monday = new Date(date);
  monday.setDate(date.getDate() - dayOfWeek);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    start: monday.toISOString().split("T")[0],
    end: sunday.toISOString().split("T")[0],
  };
}
