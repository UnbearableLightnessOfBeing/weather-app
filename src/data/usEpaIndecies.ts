import { LanguageName } from "../composables/useLocale";
import { LocaleNameEnum } from "../configs/i18nConfig";

const usEpaIndeciesEn: Record<number, string> = {
    0: "TBD",
    1: "Good",
    2: "Moderate",
    3: "Unhealthy",
    4: "Unhealthy",
    5: "Very Unhealthy",
    6: "Hazardous",
};

const usEpaIndeciesRu: Record<number, string> = {
    0: "Неопределено",
    1: "Хорошо",
    2: "Средне",
    3: "Нежелательно",
    4: "Нежелательно",
    5: "Плохо",
    6: "Опасно",
};

export const getUsEpaIndecies = (locale: LanguageName) => {
    return locale === LocaleNameEnum.Ru ? usEpaIndeciesRu : usEpaIndeciesEn;
};
