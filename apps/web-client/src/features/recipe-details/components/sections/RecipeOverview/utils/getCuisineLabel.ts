export function getCuisineLabel(cuisines?: { name: string }[]) {
  if (!cuisines || cuisines.length === 0) return null;

  if (cuisines.length === 1) return cuisines[0].name;

  return `${cuisines[0].name} +${cuisines.length - 1}`;
}