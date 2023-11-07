import { withSetup } from "../test-utils/withSetup";
import { useLocale } from "./useLocale";
import { describe, expect, it } from "vitest";
import { LocaleNameEnum } from "../configs/i18nConfig";

describe("useLocale", () => {
    const { result } = withSetup(useLocale);

    const { locale, setLocale } = result;

    it("returns locale EN on the first access", () => {
        expect(locale.value).toBe(LocaleNameEnum.En);
    });

    it("sets locale to another language", () => {
        setLocale(LocaleNameEnum.Ru);
        expect(locale.value).toBe(LocaleNameEnum.Ru);
    });
});
