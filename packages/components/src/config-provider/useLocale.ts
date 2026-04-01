import { useContext } from "react";
import type { BeeLocale } from "./locale.types";
import { BeeConfigContext } from "./context";

export function useLocale(): BeeLocale {
  return useContext(BeeConfigContext).locale;
}
