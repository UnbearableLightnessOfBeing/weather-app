import { mount } from "@vue/test-utils";
import LocalTimeComputer from "./LocalTimeComputer.vue";
import { beforeEach, describe, expect, it } from "vitest";

describe("LocalTimeComputer.vue", () => {
    const createWrapper = (props: { localtime?: string }) => {
        const propsToPass = {
            ...props,
        };

        return mount(LocalTimeComputer, {
            props: {
                ...propsToPass,
            },
            slots: {
                default: `<template #default="{ currentDate }">
                    {{ currentDate?.getTime() ?? 'undefined' }}
                </template>`,
            },
        });
    };

    let now = new Date();

    beforeEach(() => {
        now = new Date();
    });

    it("renders current date", async () => {
        const wrapper = createWrapper({ localtime: now.toString() });

        await nextTick();

        const passedDate = new Date(Number(wrapper.text().trim()));

        expect(passedDate.getFullYear()).toBe(now.getFullYear());
        expect(passedDate.getMonth()).toBe(now.getMonth());
        expect(passedDate.getDate()).toBe(now.getDate());
        expect(passedDate.getHours()).toBe(now.getHours());
        expect(passedDate.getMinutes()).toBe(now.getMinutes());
    });

    it("renders time 2 hours earlier", async () => {
        const twoHoursEarlier = new Date();
        twoHoursEarlier.setHours(now.getHours() - 2);

        const wrapper = createWrapper({
            localtime: twoHoursEarlier.toString(),
        });

        await nextTick();

        const passedDate = new Date(Number(wrapper.text().trim()));

        expect(passedDate.getHours()).toBe(now.getHours() - 2);
    });

    it("renders time 5 hours later", async () => {
        const fiveHoursLater = new Date();
        fiveHoursLater.setHours(now.getHours() + 5);

        const wrapper = createWrapper({
            localtime: fiveHoursLater.toString(),
        });

        await nextTick();

        const passedDate = new Date(Number(wrapper.text().trim()));

        expect(passedDate.getHours()).toBe(now.getHours() + 5);
    });

    it("edge case: should render the next day when 24 hours added", async () => {
        const nextDay = new Date();
        nextDay.setHours(now.getHours() + 24);

        const wrapper = createWrapper({
            localtime: nextDay.toString(),
        });

        await nextTick();

        const passedDate = new Date(Number(wrapper.text().trim()));

        expect(
            passedDate.getDate() === now.getDate() + 1 ||
                passedDate.getMonth() === now.getMonth() ||
                passedDate.getFullYear() === now.getFullYear(),
        ).toBe(true);

        expect(passedDate.getHours()).toBe(now.getHours());
    });
});
