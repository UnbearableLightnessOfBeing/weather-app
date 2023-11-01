import { mount } from "@vue/test-utils";
import CurrentDateInfo from "./CurrentDateInfo.vue";
import { describe, expect, it } from "vitest";
import { LanguageName } from "../composables/useLocale";
import dayNames from "../assets/date/dayNames.json";

interface PropsObj {
    language: LanguageName;
}

describe("CurrentDateInfo.vue", () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const createWrapper = (props: PropsObj) => {
        const propsToPass = {
            unixDate: now,
            ...props,
        };

        return mount(CurrentDateInfo, {
            props: propsToPass,
        });
    };

    it("displays passed date correctly", () => {
        const wrapper = createWrapper({ language: "ru" });

        expect(
            wrapper.text().includes(`${hours}:${minutes}`) ||
                wrapper.text().includes(`${hours}:0${minutes}`),
        ).toBe(true);

        expect(wrapper.vm.date === now.getDate()).toBe(true);
    });

    it("renders date in Russian", () => {
        const wrapper = createWrapper({ language: "ru" });

        expect(
            wrapper.text().includes("AM") || wrapper.text().includes("PM"),
        ).toBe(false);

        expect(wrapper.text().includes(dayNames.ru.full[now.getDay()])).toBe(
            true,
        );
    });

    it("renders date in English", () => {
        const wrapper = createWrapper({ language: "en" });

        expect(
            wrapper.text().includes("AM") || wrapper.text().includes("PM"),
        ).toBe(true);

        expect(wrapper.text().includes(dayNames.en.full[now.getDay()])).toBe(
            true,
        );
    });
});
