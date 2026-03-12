export function FormStatus({
  loading,
  error,
  success,
}: {
  loading: boolean;
  error: boolean;
  success: boolean;
}) {
  if (loading) return <p className="text-sm text-gray-500">Зберігаємо...</p>;

  if (error)
    return <p className="text-sm text-red-600">Помилка при збереженні</p>;

  if (success)
    return <p className="text-sm text-green-600">Успішно збережено</p>;

  return null;
}
