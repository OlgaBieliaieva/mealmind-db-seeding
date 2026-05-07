export function formatQuantity(value: number) {
  if (Number.isInteger(value)) return value;

  return Number(value.toFixed(1));
}
