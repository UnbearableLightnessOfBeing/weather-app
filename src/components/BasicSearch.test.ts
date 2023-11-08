import { mount } from "@vue/test-utils";
import BasicSearch from "./BasicSearch.vue";
import { describe, expect, it } from "vitest";
import { i18n } from "../configs/i18nConfig";

interface PropsType {
    active: boolean;
    modelValue: string;
}

const myProps: PropsType = {
    active: true,
    modelValue: "",
};

const createWrapper = (props: { isSearchActive: boolean }) => {
    return mount(BasicSearch, {
        props: {
            ...myProps,
            ...props,
        },
        global: {
            plugins: [i18n],
            stubs: {
                Transition: {
                    template: "<span />",
                },
            },
            directives: {
                Tooltip: () => {},
            },
        },
    });
};

describe("BasicSearch.vue", () => {
    it("renders without input field", () => {
        const wrapper = createWrapper({ isSearchActive: false });

        expect(wrapper.find("[data-test]=input").exists()).toBe(false);
    });

    it("renders with input field", () => {
        const wrapper = createWrapper({ isSearchActive: true });

        console.log(wrapper.html());

        expect(wrapper.find("[data-test]=input").exists()).toBe(true);
    });

    it("emits the update:modelValue event in 400 ms after input change", async () => {
        const wrapper = createWrapper({ isSearchActive: true });

        await wrapper.find("[data-test]=input").setValue("aboba");

        expect(wrapper.emitted()["update:modelValue"]).toBe(undefined);

        await new Promise((resolve) => setTimeout(resolve, 500));

        expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["aboba"]);
    });

    it("debounces the update:modelValue event", async () => {
        const wrapper = createWrapper({ isSearchActive: true });

        const input = wrapper.find("[data-test]=input");

        await input.setValue("a");
        await input.setValue("ab");
        await input.setValue("abo");
        await input.setValue("abob");
        await input.setValue("aboba");

        await new Promise((resolve) => setTimeout(resolve, 500));

        expect(wrapper.emitted()["update:modelValue"].length).toBe(1);
        expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["aboba"]);
    });
});
