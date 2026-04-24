"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDateKey = parseDateKey;
exports.toDateKey = toDateKey;
exports.addDays = addDays;
exports.toUTCDateOnly = toUTCDateOnly;
function parseDateKey(dateStr) {
    // створюємо ЛОКАЛЬНУ дату без timezone зсуву
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day); // 🔥 ключ
}
function toDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
function addDays(dateStr, days) {
    const d = parseDateKey(dateStr);
    d.setDate(d.getDate() + days);
    return toDateKey(d);
}
function toUTCDateOnly(dateStr) {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d));
}
