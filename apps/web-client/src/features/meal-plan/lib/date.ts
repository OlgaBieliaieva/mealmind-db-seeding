export function getWeekStart(date: string) {
  const d = new Date(date);
  const day = d.getDay() || 7; // monday = 1
  if (day !== 1) {
    d.setDate(d.getDate() - (day - 1));
  }
  return d;
}

export function generateWeek(start: Date) {
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d.toISOString().split("T")[0];
  });
}

export function formatWeekLabel(days: string[]) {
  const start = new Date(days[0]);
  const end = new Date(days[6]);

  return `${start.getDate()}–${end.getDate()} ${start.toLocaleString("uk-UA", {
    month: "long",
  })}`;
}

export function toUTCDateOnly(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, day));
}

export function getWeekDays(baseDateStr: string) {
  const start = toUTCDateOnly(baseDateStr);

  const day = start.getUTCDay() === 0 ? 7 : start.getUTCDay();

  const monday = new Date(start);
  monday.setUTCDate(start.getUTCDate() - day + 1);

  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);

    return {
      date: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("uk-UA", { weekday: "short" }),
      day: d.getUTCDate(),
    };
  });
}
