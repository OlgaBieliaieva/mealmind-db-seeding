export function parseDateKey(dateStr: string) {
  // створюємо ЛОКАЛЬНУ дату без timezone зсуву
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // 🔥 ключ
}

export function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function addDays(dateStr: string, days: number) {
  const d = parseDateKey(dateStr);
  d.setDate(d.getDate() + days);
  return toDateKey(d);
}

export function toUTCDateOnly(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

