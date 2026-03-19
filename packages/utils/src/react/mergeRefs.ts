import type { Ref, RefCallback } from "react";

export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  const filtered = refs.filter(Boolean) as Array<Ref<T>>;
  if (filtered.length === 0) return undefined;

  const merged: RefCallback<T> = (value) => {
    for (const ref of filtered) {
      if (typeof ref === "function") {
        ref(value);
      } else {
        (ref as { current: T | null }).current = value;
      }
    }
  };

  return merged;
}
