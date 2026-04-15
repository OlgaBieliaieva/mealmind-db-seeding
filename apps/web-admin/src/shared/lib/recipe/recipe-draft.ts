const KEY = "recipe:draft";

export function getRecipeDraft<T>() {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function setRecipeDraft<T>(data: T) {
  sessionStorage.setItem(KEY, JSON.stringify(data));
}

export function clearRecipeDraft() {
  sessionStorage.removeItem(KEY);
}
