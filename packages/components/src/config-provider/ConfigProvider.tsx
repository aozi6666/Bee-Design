import type { FC, PropsWithChildren } from "react";
import { useMemo } from "react";
import { BeeConfigContext } from "./context";
import type { ConfigProviderProps } from "./ConfigProvider.types";
import { deepMerge } from "./mergeLocale";
import { zhCN } from "./locales/zh-CN";

export const ConfigProvider: FC<PropsWithChildren<ConfigProviderProps>> = ({
  locale,
  children,
}) => {
  const mergedLocale = useMemo(() => deepMerge(zhCN, locale), [locale]);
  const value = useMemo(() => ({ locale: mergedLocale }), [mergedLocale]);
  return <BeeConfigContext.Provider value={value}>{children}</BeeConfigContext.Provider>;
};

export default ConfigProvider;
