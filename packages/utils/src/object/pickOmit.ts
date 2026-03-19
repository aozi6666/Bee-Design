export function pick<T extends object, const K extends readonly (keyof T)[]>(
  obj: T,
  keys: K,
): Pick<T, K[number]> {
  const out = {} as Pick<T, K[number]>;
  for (const key of keys) {
    if (key in obj) out[key] = obj[key];
  }
  return out;
}

export function omit<T extends object, const K extends readonly (keyof T)[]>(
  obj: T,
  keys: K,
): Omit<T, K[number]> {
  const out = { ...obj } as Omit<T, K[number]>;
  for (const key of keys) {
    delete (out as Record<string, unknown>)[key as string];
  }
  return out;
}
