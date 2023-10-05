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
    <div class="current-weather-info">
        <LocationInterface
            v-if="!isDesktop"
            :model-value="location"
            @update:model-value="(value) => $emit('update:location', value)"
        />
        <!-- <div class="flex-between"> -->
        <WeatherCondition :condition="current?.condition" />
        <!-- <MeasurementToggler /> -->
        <!-- </div> -->
        <MainInfo :current="current" />
    </div>
</template>

<style scoped lang="scss">
.current-weather-info {
    padding: 16px;
    // position: relative;

    & > * + * {
        margin-top: 20px;
    }
}
// .flex-between {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     gap: 10px;
// }

@media screen and (min-width: 1440px) {
    .current-weather-info {
        height: 545px;
        padding-inline: 66px;
        padding-block: 40px;
    }

    // .flex-between {
    //     align-items: center;
    // }
}
</style>
