export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1/client"}${url}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-family-id": "c1d8e7f4-3b29-4a6c-8e15-7f0a2b9d6e33",
        "x-user-id": "11111111-1111-1111-1111-111111111111",

        ...(options?.headers || {}),
      },
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "API error");
  }

  return res.json();
}
