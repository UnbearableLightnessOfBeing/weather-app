import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import App from "./App.vue";
import { i18n } from "./configs/i18nConfig";
import { VueQueryPlugin } from "@tanstack/vue-query";

const wrapper = mount(App, {
    global: {
        plugins: [i18n, VueQueryPlugin],
        stubs: {
            VDropdown: {
                template: "<div />",
            },
        },
    },

    directives: {
        tooltip: () => {},
    },
});

describe("App.vue", () => {
    it("Fetches data and renders components", async () => {
        const loaders = wrapper.findAll("[data-test=loader]");
        expect(loaders.length).toBe(19);

        const nodatas = wrapper.findAll("[data-test=nodata]");
        expect(nodatas.length).toBe(0);

        await new Promise((resolve) => setTimeout(resolve, 500));

        const loadersAfter = wrapper.findAll("[data-test=loader]");
        expect(loadersAfter.length).toBe(0);

        expect(wrapper.text()).toContain("Hum");
        expect(wrapper.text()).toContain("Precip");
        expect(wrapper.text()).toContain("Cloud coverage");
        expect(wrapper.text()).toContain("Pressure");
    });
});
