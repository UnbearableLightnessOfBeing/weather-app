<script setup lang="ts">
import { useBreakpoints } from "@vueuse/core";
import { CurrentWeather } from "../types/requestTypes";

const props = defineProps<{
    current?: CurrentWeather;
    location: string;
    isLoading: boolean;
}>();

const emits = defineEmits<{
    /* eslint-disable */
    (e: "update:location", value: string): void;
    /* eslint-enable */
}>();

const breakPoints = useBreakpoints({
    desktop: 1440,
});

const isDesktop = breakPoints.greaterOrEqual("desktop");

const writableComputedLocation = computed({
    get() {
        return props.location;
    },
    set(value: string) {
        emits("update:location", value);
    },
});
</script>

<template>
    <div class="current-weather-stats">
        <LocationInterface
            v-if="isDesktop"
            v-model="writableComputedLocation"
        />
        <StatCards :current="current" :is-loading="isLoading" />
        <HorizontalDivider />
        <QualityCards
            :air-quality="current?.air_quality"
            :uv-index="current?.uv"
            :is-loading="isLoading"
        />
    </div>
</template>

<style scoped lang="scss">
.current-weather-stats {
    padding: 16px;

    & > * + * {
        margin-top: 20px;
    }

    @media screen and (min-width: 1440px) {
        padding-block: 38px;
        padding-inline: 44px;

        & > * + * {
            margin-top: 30px;
        }
    }
}
</style>
