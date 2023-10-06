<script setup lang="ts">
import { useBreakpoints } from "@vueuse/core";
import { CurrentWeather } from "../types/requestTypes";

defineProps<{
    current?: CurrentWeather;
    location: string;
}>();

defineEmits<{
    /* eslint-disable */
    (e: "update:location", value: string): void;
    /* eslint-enable */
}>();

const breakPoints = useBreakpoints({
    desktop: 1440,
});

const isDesktop = breakPoints.greaterOrEqual("desktop");
</script>

<template>
    <div class="current-weather-stats">
        <LocationInterface
            v-if="isDesktop"
            :model-value="location"
            @update:model-value="(value) => $emit('update:location', value)"
        />
        <StatCards :current="current ?? undefined" />
        <BasicHorizontalDivider />
        <QualityCards
            :air-quality="current?.air_quality"
            :uv-index="current?.uv"
        />
    </div>
</template>

<style scoped lang="scss">
.current-weather-stats {
    padding: 16px;

    & > * + * {
        margin-top: 20px;
    }
}

@media screen and (min-width: 1440px) {
    .current-weather-stats {
        padding-block: 38px;
        padding-inline: 44px;

        & > * + * {
            margin-top: 30px;
        }
    }
}
</style>
