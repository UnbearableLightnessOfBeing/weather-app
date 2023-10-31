import { mount } from "@vue/test-utils";
import CreditLink from "./CreditLink.vue";
import { describe, expect, it } from "vitest";

describe("CreditLink.vue", () => {
    const wrapper = mount(CreditLink);

    it("renders a credit link", () => {
        expect(wrapper.html()).not.toBeNull();

        expect(wrapper.html().includes("Built with")).toBe(true);
        expect(wrapper.html().includes("Weather API")).toBe(true);
    });
});
