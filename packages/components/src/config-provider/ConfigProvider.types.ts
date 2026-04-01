import type { BeeLocale, DeepPartial } from "./locale.types";

export interface ConfigProviderProps {
  locale?: DeepPartial<BeeLocale>;
}
