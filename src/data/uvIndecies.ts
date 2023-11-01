import { LanguageName } from "../composables/useLocale";
import { LocaleNameEnum } from "../configs/i18nConfig";

const uvIndeciesEn: Record<number, string> = {
    1: "Low",
    2: "Low",
    3: "Moderate",
    4: "Moderate",
    5: "Moderate",
    6: "High",
    7: "High",
    8: "Very high",
    9: "Very high",
    10: "Very high",
};

const uvIndeciesRu: Record<number, string> = {
    1: "Низкий",
    2: "Низкий",
    3: "Средний",
    4: "Средний",
    5: "Средний",
    6: "Высокий",
    7: "Высокий",
    8: "Очень высокий",
    9: "Очень высокий",
    10: "Очень высокий",
};

export const getUvIndecies = (locale: LanguageName) => {
    return locale === LocaleNameEnum.Ru ? uvIndeciesRu : uvIndeciesEn;
};
