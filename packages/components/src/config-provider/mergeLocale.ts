const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (!value || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

export function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override ?? base) as T;
  }
  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  Object.keys(override).forEach((key) => {
    const nextBase = (base as Record<string, unknown>)[key];
    const nextOverride = (override as Record<string, unknown>)[key];
    result[key] = deepMerge(nextBase, nextOverride);
  });
  return result as T;
}
