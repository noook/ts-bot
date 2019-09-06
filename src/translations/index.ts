import { TranslatorParam, Translations } from '@/types/translator';
import commonFr from './common.fr';
import commonEn from './common.en';

export enum TranslatorLangs {
  FR = 'fr',
  EN = 'en',
}

class Translator {
  private translations: Translations;

  constructor() {
    this.translations = {
      [TranslatorLangs.FR]: {
        ...commonFr
      },
      [TranslatorLangs.EN]: {
        ...commonEn,
      },
    };
  }

  private deepTrans(tree: string[], curr: TranslatorParam): string {
    const current = curr[tree.shift()];
    if (!tree.length) return current as string;

    return this.deepTrans(tree, current as TranslatorParam);
  }

  public trans(locale: TranslatorLangs, key: string, params?: TranslatorParam): string {
    let translation = this.deepTrans(key.split('.'), this.translations[locale]);
    if (!params) return translation;

    Object.entries(params).forEach(([key, value]) => {
      translation = translation.replace(`{:${key}}`, value.toString());
    });

    return translation;
  }
}

export default new Translator;
