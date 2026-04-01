import { createContext } from "react";
import type { BeeLocale } from "./locale.types";
import { zhCN } from "./locales/zh-CN";

export interface BeeConfigContextValue {
  locale: BeeLocale;
}

const defaultConfig: BeeConfigContextValue = {
  locale: zhCN,
};

export const BeeConfigContext = createContext<BeeConfigContextValue>(defaultConfig);
