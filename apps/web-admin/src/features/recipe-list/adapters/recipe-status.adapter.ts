export function getRecipeStatusLabel(status: string) {
  switch (status) {
    case "draft":
      return "Чернетка";
    case "ready":
      return "Готовий";
    case "published":
      return "Опубліковано";
    case "archived":
      return "Архів";
    default:
      return status;
  }
}

export function getRecipeStatusVariant(status: string) {
  switch (status) {
    case "draft":
      return "neutral";
    case "ready":
      return "info";
    case "published":
      return "success";
    case "archived":
      return "danger";
    default:
      return "neutral";
  }
}
