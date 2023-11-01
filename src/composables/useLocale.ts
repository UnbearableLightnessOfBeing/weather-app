import { useI18n } from "vue-i18n";
import { LocaleNameEnum } from "../configs/i18nConfig";

export type LanguageName = (typeof LocaleNameEnum)[keyof typeof LocaleNameEnum];

type UseLocaleReturnType = {
    /* eslint-disable */
    locale: ComputedRef<LanguageName>;
    setLocale: (locale: LanguageName) => void;
    /* eslint-enable */
};

export const useLocale = (): UseLocaleReturnType => {
    const { locale: i18nLocale } = useI18n();

    const isLanguageName = (locale: string): locale is LanguageName => {
        for (let name of Object.values(LocaleNameEnum)) {
            if (locale === name) {
                return true;
            }
        }

        return false;
    };

    const locale = computed<LanguageName>(() => {
        if (isLanguageName(i18nLocale.value)) {
            return i18nLocale.value;
        }
        return LocaleNameEnum.En;
    });

    const setLocale = (locale: LanguageName) => {
        i18nLocale.value = locale;
    };

    return {
        locale,
        setLocale,
    };
};
