<script setup lang="ts">
import { useBreakpoints } from "@vueuse/core";
import { GetForecastResponse } from "../types/requestTypes";

const props = defineProps<{
    data?: GetForecastResponse;
    location: string;
    isLoading: boolean;
}>();

const emits = defineEmits<{
    /* eslint-disable */
    (e: "update:location", value: string): void;
    /* eslint-enable */
}>();

const writableComputedLocation = computed({
    get() {
        return props.location;
    },
    set(value) {
        emits("update:location", value);
    },
});

const breakPoints = useBreakpoints({
    desktop: 1440,
});

const isDesktop = breakPoints.greaterOrEqual("desktop");
</script>

<template>
    <div class="current-weather-info">
        <LocationInterface
            v-if="!isDesktop"
            v-model="writableComputedLocation"
        />
        <WeatherCondition
            :condition="data?.current?.condition"
            :is-day="data?.current ? Boolean(data.current.is_day) : undefined"
            :is-loading="isLoading"
        />
        <MainInfo
            :current="data?.current"
            :location="data?.location"
            :is-loading="isLoading"
        />
    </div>
</template>

<style scoped lang="scss">
.current-weather-info {
    padding: 16px;

    & > * + * {
        margin-top: 20px;
    }

    @media screen and (min-width: 1440px) {
        height: 545px;
        padding-inline: 66px;
        padding-block: 40px;
    }
}
</style>
