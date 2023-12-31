<script setup lang="ts">
import { useLocale } from "../composables/useLocale";
import { LocaleNameEnum } from "../configs/i18nConfig";

const props = defineProps<{
    title: string;
    time?: string;
    isLoading?: boolean;
}>();

const { locale } = useLocale();

const getStrMatchOrNull = (str: string, regexp: RegExp): string | null => {
    const match = str.match(regexp)?.[0];
    return match ? match : null;
};

const getDigitTimeStr = (time: string | undefined): string | null => {
    if (typeof time === "undefined") return null;
    return getStrMatchOrNull(time, /\d\d:\d\d/);
};

const getTimeOfDayStr = (time: string | undefined): "AM" | "PM" | null => {
    if (typeof time === "undefined") return null;
    const match = getStrMatchOrNull(time, /AM|PM/);
    return match ? (match as "AM" | "PM") : null;
};

const get24HourTimeFormat = (time: string | undefined): string | null => {
    if (typeof time === "undefined") return null;
    const digitTime = getDigitTimeStr(time);
    const timeOfDay = getTimeOfDayStr(time);

    if (digitTime && timeOfDay) {
        if (timeOfDay === "AM") {
            return digitTime;
        } else {
            const [hours, minutes] = digitTime.split(":");
            return `${Number(hours) + 12}:${minutes}`;
        }
    } else return null;
};

const localizedTime = computed(() => {
    if (locale.value !== LocaleNameEnum.Ru) {
        const digitTime = getDigitTimeStr(props.time);
        return digitTime ? digitTime : props.time;
    }

    const fullFormat = get24HourTimeFormat(props.time);
    return fullFormat ? fullFormat : props.time;
});

const localizedTimeOfDay = computed(() => {
    if (locale.value === LocaleNameEnum.Ru) return "";
    const timeOfDay = getTimeOfDayStr(props.time);
    return timeOfDay ? timeOfDay : props.time;
});

const hourHandCssTransform = computed<string>(() => {
    const fullFormat = get24HourTimeFormat(props.time);
    if (fullFormat) {
        const [hours, minutes] = fullFormat.split(":");
        const totalHours = Number(hours) + Number(minutes) / 60;
        return `rotate(${Math.round((720 / 24) * totalHours - 90)}deg)`;
    } else return "rotate(0deg)";
});

const minuteHandCssTransform = computed<string>(() => {
    const fullFormat = get24HourTimeFormat(props.time);
    if (fullFormat) {
        const minutes = fullFormat.split(":")[1];

        return `rotate(${Math.round((360 / 60) * Number(minutes) - 90)}deg)`;
    } else return "rotate(0deg)";
});
</script>

<template>
    <BasicLoader v-if="isLoading" class="astro-clock-filler" />
    <div v-else-if="time" class="astro-clock">
        <div class="astro-clock__title">{{ title }}</div>
        <div class="astro-clock__clock-site">
            <div class="astro-clock__clock">
                <div></div>
                <div class="astro-clock__pointers">
                    <Transition name="hour-hand" appear>
                        <div class="astro-clock__hour-hand"></div>
                    </Transition>
                    <Transition name="minute-hand" appear>
                        <div class="astro-clock__minute-hand"></div>
                    </Transition>
                    <Transition name="second-hand" appear>
                        <div class="astro-clock__second-hand"></div>
                    </Transition>
                </div>
            </div>
            <div class="astro-clock__time">
                {{ localizedTime }}
                <span class="astro-clock__time-of-day">{{
                    localizedTimeOfDay
                }}</span>
            </div>
        </div>
    </div>
    <BasicNodata v-else class="astro-clock-filler" />
</template>

<style scoped lang="scss">
.astro-clock {
    width: fit-content;

    & > * + * {
        margin-top: 20px;
    }

    &-filler {
        width: 124px;
        height: 230px;
    }

    &__clock-site {
        padding-inline: 18px;
        padding-block: 30px;
        background-color: var(--basic-light-dull);
        border-radius: 100px;
        width: 124px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        gap: 55px;
    }

    &__title,
    &__time {
        font-weight: var(--fw-normal-thiner);
        text-align: center;
    }

    &__title {
        font-size: var(--fs-heading);
    }

    &__time {
        font-size: var(--fs-stats);
    }

    &__time-of-day {
        display: inline-block;
        font-size: var(--fs-tooltip);
        font-weight: var(--fw-normal-thiner);
    }

    &__clock {
        display: grid;
        height: 35px;
        grid-template-columns: 1fr 1fr;
    }

    &__pointers {
        position: relative;
    }

    &__second-hand,
    &__minute-hand,
    &__hour-hand {
        position: absolute;
        z-index: 1;
        left: 0;
        border-radius: 100px;
        animation-name: clock-spin;
        animation-duration: 3s;
    }

    &__second-hand {
        width: 48px;
        height: 2px;
        background-color: #885ffc;
        transform-origin: 0% 1px;
        transform: rotate(-90deg);
        bottom: -1px;
    }

    &__minute-hand {
        width: 34px;
        height: 4px;
        background-color: #828282;
        transform-origin: 0% 2px;
        transform: v-bind(minuteHandCssTransform);
        transition: all 0.3s ease;
        bottom: -2px;
    }

    &__hour-hand {
        width: 25px;
        height: 4px;
        background-color: #e0e0e0;
        transform-origin: 0% 2px;
        transform: v-bind(hourHandCssTransform);
        transition: all 0.3s ease;
        bottom: -2px;
    }
}

.second-hand,
.minute-hand,
.hour-hand {
    &-enter-active {
        transition: all 2s cubic-bezier(0.05, 0.4, 0, 0.99);
    }
}

.second-hand-enter-from {
    transform: rotate(-2000deg);
}

.minute-hand-enter-from {
    transform: rotate(-1000deg);
}

.hour-hand-enter-from {
    transform: rotate(-500deg);
}
</style>
