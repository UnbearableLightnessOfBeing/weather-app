import { mount } from "@vue/test-utils";
import LocalTimeComputer from "./LocalTimeComputer.vue";
import { describe, expect, it } from "vitest";

describe("LocalTimeComputer.vue", () => {
    const createWrapper = (props: { localtime?: string }) => {
        const propsToPass = {
            ...props,
        };

        return mount(LocalTimeComputer, {
            props: {
                ...propsToPass,
            },
        });
    };

    it("renders current date", () => {
        const now = new Date();

        const wrapper = createWrapper({ localtime: now.toString() });
        const instanceDate = wrapper.vm.unixCurrentDate;

        expect(instanceDate?.getFullYear() === now.getFullYear()).toBe(true);
        expect(instanceDate?.getMonth() === now.getMonth()).toBe(true);
        expect(instanceDate?.getDate() === now.getDate()).toBe(true);
        expect(instanceDate?.getHours() === now.getHours()).toBe(true);
        expect(instanceDate?.getMinutes() === now.getMinutes()).toBe(true);
    });

    it("renders time 2 hours earlier", () => {
        const now = new Date();
        const twoHoursEarlier = new Date();
        twoHoursEarlier.setHours(now.getHours() - 2);

        const wrapper = createWrapper({
            localtime: twoHoursEarlier.toString(),
        });
        const instanceDate = wrapper.vm.unixCurrentDate;

        expect(instanceDate?.getHours() === now.getHours() - 2).toBe(true);
    });

    it("renders time 5 hours later", () => {
        const now = new Date();
        const fiveHoursLater = new Date();
        fiveHoursLater.setHours(now.getHours() + 5);

        const wrapper = createWrapper({
            localtime: fiveHoursLater.toString(),
        });
        const instanceDate = wrapper.vm.unixCurrentDate;

        expect(instanceDate?.getHours() === now.getHours() + 5).toBe(true);
    });

    it("edge case: should render the next day when 23 hours added", () => {
        const now = new Date();
        const nextDay = new Date();
        nextDay.setHours(now.getHours() + 23);

        const wrapper = createWrapper({
            localtime: nextDay.toString(),
        });
        const instanceDate = wrapper.vm.unixCurrentDate;

        expect(
            instanceDate?.getDate() === now.getDate() + 1 ||
                instanceDate?.getMonth() === now.getMonth() + 1,
        ).toBe(true);
        expect(instanceDate?.getHours() === now.getHours() - 1).toBe(true);
    });
});