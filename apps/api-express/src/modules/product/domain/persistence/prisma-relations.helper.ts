export function connectRelation(id?: string | null) {
  return id ? { connect: { id } } : undefined;
}
