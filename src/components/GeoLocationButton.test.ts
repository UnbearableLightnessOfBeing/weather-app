import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import GeoLocationButton from "./GeoLocationButton.vue";
import { i18n } from "../configs/i18nConfig";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { useGeolocation } from "@vueuse/core";
import api from "../api/requests";

const createWrapper = () => {
    return mount(GeoLocationButton, {
        global: {
            plugins: [i18n, VueQueryPlugin],
            mocks: {
                t: (val: string) => val,
            },
            directives: {
                Tooltip: () => {},
            },
        },
    });
};

const mockData = {
    isSupported: computed(() => true),
    coords: ref({
        accuracy: 3210.0963549335447,
        latitude: 53.2612342,
        longitude: 34.3655184,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
    }),
    locatedAt: ref(null),
    error: ref(null),
    resume: () => {},
    pause: () => {},
};

const mocks = vi.hoisted(() => {
    return {
        useGeolocation: vi.fn().mockImplementation(() => mockData),
    };
});

vi.mock("@vueuse/core", () => {
    return {
        useGeolocation: mocks.useGeolocation,
    };
});

describe("GeoLocationButton.vue", () => {
    it("mounts, uses geolocation and calls the api function when clicked", () => {
        const wrapper = createWrapper();

        const button = wrapper.find("[data-test=geo-location-button]");

        expect(button.exists()).toBe(true);

        expect(useGeolocation).toHaveBeenCalledTimes(1);

        const spy = vi.spyOn(api, "getCurrentLocation");

        expect(spy).toHaveBeenCalledTimes(0);

        button.trigger("click");

        expect(spy).toHaveBeenCalledTimes(1);
    });
});
