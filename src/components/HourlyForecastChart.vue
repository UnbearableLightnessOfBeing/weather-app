<script setup lang="ts">
import { useDraggableScroll } from "../composables/useDraggableScroll";
import { Line as LineChart } from "vue-chartjs";
import colors from "../assets/colors/colors.json";
import type {
    HourlyWeather,
    HourlyWeatherNumberKey,
} from "../types/requestTypes";
import { useChartData } from "../composables/useChartData";

export type ChartOption = {
    propName: HourlyWeatherNumberKey;
    name: string;
    measurement: string;
};

const props = defineProps<{
    hourlyForecast: HourlyWeather[];
    activeOption: ChartOption;
}>();

const { conditionRange, getChartOptions, getChartData } = useChartData(
    computed(() => props.hourlyForecast),
);

const data = computed(() => {
    return getChartData(props.activeOption.propName, colors["chart-default"]);
});

const options = computed(() => getChartOptions(props.activeOption.propName));

const hourlyForecastContainer = ref<HTMLElement | null>(null);

// makes container scrollable by dragging
useDraggableScroll(hourlyForecastContainer);

const scrollOnWheel = function (e: WheelEvent) {
    if (hourlyForecastContainer.value) {
        hourlyForecastContainer.value.scrollLeft += e.deltaY / 4;
    }
};
</script>

<template>
    <div
        ref="hourlyForecastContainer"
        class="hourly-forecast-chart"
        @wheel.prevent="scrollOnWheel"
    >
        <div class="hourly-forecast-chart__chart-container">
            <LineChart :data="data" :options="options" />
        </div>
        <ConditionIconRange :conditions="conditionRange" />
    </div>
</template>

<style scoped lang="scss">
.hourly-forecast-chart {
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 5px;
    gap: 5px;
    overflow-x: scroll;
    margin-left: -16px;
    width: 100vw;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }

    &__chart-container {
        width: 1000px;
        min-width: 1000px;
        overflow-y: hidden;
    }

    @media screen and (min-width: 600px) {
        margin-left: 0;
        width: 100%;
    }
}
</style>
