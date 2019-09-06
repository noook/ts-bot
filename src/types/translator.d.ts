export interface TranslatorParam {
  [key: string]: string | TranslatorParam;
}

export interface Translations {
  [key: TranslatorLangs]: string | TranslatorParam;
}
