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

    const locale = computed<LanguageName>(() => {
        return i18nLocale.value as LanguageName;
    });

    const setLocale = (locale: LanguageName) => {
        i18nLocale.value = locale;
    };

    return {
        locale,
        setLocale,
    };
};
