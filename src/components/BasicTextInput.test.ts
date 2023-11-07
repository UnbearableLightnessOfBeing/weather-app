import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BasicTextInput from "./BasicTextInput.vue";

describe("BasicTextInput.vue", () => {
    const createWrapper = () => {
        return mount(BasicTextInput, {
            props: {
                modelValue: "",
                placeholder: "aboba",
            },
        });
    };

    it("displays the placeholder", () => {
        const wrapper = createWrapper();

        const input = wrapper.find("[data-test]=basic-input");

        expect(input.attributes().placeholder).toBe("aboba");
    });

    it("emits the event properly", async () => {
        const wrapper = createWrapper();

        const input = wrapper.find("[data-test]=basic-input");

        await input.setValue("test-value");

        expect(wrapper.emitted()["update:modelValue"][0]).toEqual([
            "test-value",
        ]);

        await input.setValue("test-value-2");

        expect(wrapper.emitted()["update:modelValue"][1]).toEqual([
            "test-value-2",
        ]);
        expect(wrapper.emitted()["update:modelValue"].length).toBe(2);
    });

    it("updates the emitted value back", async () => {
        const wrapper = createWrapper();

        const input = wrapper.find("[data-test]=basic-input");

        await input.setValue("update me back");

        expect((<HTMLInputElement>input.element).value).toBe("update me back");
    });
});
