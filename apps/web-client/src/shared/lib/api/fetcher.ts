export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-family-id": "c1d8e7f4-3b29-4a6c-8e15-7f0a2b9d6e33",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}
