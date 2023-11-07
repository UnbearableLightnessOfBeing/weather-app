import { mount } from "@vue/test-utils";
import CurrentDateInfo from "./CurrentDateInfo.vue";
import { describe, expect, it } from "vitest";
import { LanguageName } from "../composables/useLocale";
import dayNames from "../assets/date/dayNames.json";

interface PropsObj {
    language: LanguageName;
}

describe("CurrentDateInfo.vue", () => {
    const date = new Date(1698930998346); // 16:16 November 2, Thursday, 2023

    const createWrapper = (props: PropsObj) => {
        const propsToPass = {
            unixDate: date,
            ...props,
        };

        return mount(CurrentDateInfo, {
            props: propsToPass,
        });
    };

    it("displays passed date correctly", () => {
        const wrapper = createWrapper({ language: "ru" });

        console.log("text: ", wrapper.text());

        expect(wrapper.text().includes("16:16")).toBe(true);
        expect(wrapper.text().includes("2 ноя")).toBe(true);
        expect(wrapper.text().includes("Четверг")).toBe(true);
        expect(wrapper.text().includes("23")).toBe(true);
    });

    it("renders date in Russian", () => {
        const wrapper = createWrapper({ language: "ru" });

        expect(
            wrapper.text().includes("AM") || wrapper.text().includes("PM"),
        ).toBe(false);

        expect(wrapper.text().includes(dayNames.ru.full[date.getDay()])).toBe(
            true,
        );
    });

    it("renders date in English", () => {
        const wrapper = createWrapper({ language: "en" });

        expect(
            wrapper.text().includes("AM") || wrapper.text().includes("PM"),
        ).toBe(true);

        expect(wrapper.text().includes(dayNames.en.full[date.getDay()])).toBe(
            true,
        );
    });
});
