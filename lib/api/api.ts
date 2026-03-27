// TODO DELETE after refactor
// SECTION ███ API CLIENT ███

export async function apiFetch<T>(
  url: string,

  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return res.json();
}
