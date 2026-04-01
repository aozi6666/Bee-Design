export { default as Button } from "./components/Button";
export { default as Menu } from "./components/Menu";
export { default as AutoComplete } from "./components/AutoComplete";
export { default as Icon } from "./components/Icon";
export { default as Input } from "./components/Input";
export { default as Progress } from "./components/Progress";
export { default as Transition } from "./components/Transition";
export { default as Upload } from "./components/Upload";

export { ConfigProvider } from "./config-provider/ConfigProvider";
export { useLocale } from "./config-provider/useLocale";
export { zhCN } from "./config-provider/locales/zh-CN";
export { enUS } from "./config-provider/locales/en-US";
export type { BeeLocale, DeepPartial } from "./config-provider/locale.types";
export type { ConfigProviderProps } from "./config-provider/ConfigProvider.types";

export { setupIcons } from "./setupIcons";
