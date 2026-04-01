export type LocaleText = string;

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export interface BeeLocaleGlobal {
  loading: LocaleText;
  empty: LocaleText;
}

export interface BeeLocaleUpload {
  removeFile: LocaleText;
  uploadFailed: LocaleText;
}

export interface BeeLocaleAutoComplete {
  loading: LocaleText;
  empty: LocaleText;
}

export interface BeeLocale {
  global: BeeLocaleGlobal;
  upload: BeeLocaleUpload;
  autoComplete: BeeLocaleAutoComplete;
}
