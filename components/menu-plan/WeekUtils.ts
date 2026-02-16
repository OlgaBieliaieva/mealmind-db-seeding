export function getMonday(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDay(); // 0 (Sun) - 6 (Sat)

  const diff = day === 0 ? -6 : 1 - day;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);

  return monday;
}

export function getWeekRange(dateString: string) {
  const monday = getMonday(dateString);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    start: monday,
    end: sunday,
  };
}

export function formatDDMMYY(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);

  return `${dd}.${mm}.${yy}`;
}
