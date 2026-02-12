export function getWeekRangeFromDate(dateString: string) {
  const date = new Date(dateString);

  const dayOfWeek = (date.getDay() + 6) % 7; // convert Sunday=0 to 6

  const monday = new Date(date);
  monday.setDate(date.getDate() - dayOfWeek);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    start: formatLocalDate(monday),
    end: formatLocalDate(sunday),
  };
}

export function generateFullWeek(startDateString: string) {
  const start = new Date(startDateString + "T00:00:00");

  const days = [];

  for (let i = 0; i < 7; i++) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);

    days.push(formatLocalDate(current));
  }

  return days;
}

function formatLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
