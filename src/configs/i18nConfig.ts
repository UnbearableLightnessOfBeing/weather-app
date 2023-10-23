import { createI18n } from "vue-i18n";
import en from "../assets/localization/en.json";
import ru from "../assets/localization/ru.json";

export const LocaleNameEnum = {
    En: "en",
    Ru: "ru",
} as const;

export const languages = [
    {
        name: LocaleNameEnum.En,
        title: "English",
        localeMessages: en,
    },
    {
        name: LocaleNameEnum.Ru,
        title: "Русский",
        localeMessages: ru,
    },
];

type Locales = {
    [k: string]: typeof en;
};

const locales: Locales = {};

languages.forEach((lang) => {
    locales[lang.name] = lang.localeMessages;
});

export const i18n = createI18n({
    legacy: false,
    locale: LocaleNameEnum.En,
    fallbackFormat: LocaleNameEnum.En,
    messages: locales,
});
