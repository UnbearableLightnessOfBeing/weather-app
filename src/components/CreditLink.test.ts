import { mount } from "@vue/test-utils";
import CreditLink from "./CreditLink.vue";
import { describe, expect, it } from "vitest";
import { i18n } from "../configs/i18nConfig";
import { LanguageName } from "../composables/useLocale";

describe("CreditLink.vue", () => {
    const createWrapper = (lang: LanguageName) => {
        i18n.global.locale.value = lang;

        return mount(CreditLink, {
            global: {
                plugins: [i18n],
            },
        });
    };

    it("renders the credit link", () => {
        const wrapper = createWrapper("en");

        expect(wrapper.html()).not.toBeNull();
        expect(wrapper.html().includes("Weather API")).toBe(true);
    });

    it("renders the credit link in English", () => {
        const wrapper = createWrapper("en");

        expect(wrapper.html().includes("Built with")).toBe(true);
    });

    it("renders the credit link in Russian", () => {
        const wrapper = createWrapper("ru");

        expect(wrapper.html().includes("Сделано при помощи")).toBe(true);
    });
});
