<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import colors from "../assets/colors/colors.json";
import { useI18n } from "vue-i18n";
import { useDraggableScroll } from "../composables/useDraggableScroll";
import { scalesConfiguration } from "../configs/chartjsConfig";
import { Line as LineChart } from "vue-chartjs";
import type {
    HourlyWeather,
    HourlyWeatherNumberKey,
} from "../types/requestTypes";

type ChartOptionName =
    | "temp."
    | "precip."
    | "wind"
    | "pressure"
    | "температура"
    | "осадки"
    | "ветер"
    | "давление";

export type ChartOption = {
    propName: HourlyWeatherNumberKey;
    name: ChartOptionName;
    measurement: string;
};

const props = defineProps<{
    hourlyForecast: HourlyWeather[];
    activeOption: ChartOption;
}>();

const { locale } = useI18n();

const dateFormat = computed(() => {
    return locale.value === "ru" ? "HH:mm" : "h A";
});

const tickLabels = computed(() => {
    return props.hourlyForecast.map(
        (item) => useDateFormat(new Date(item.time), dateFormat.value).value,
    );
});

const chartData = computed(() => {
    return props.hourlyForecast.map(
        (item) => item[props.activeOption.propName],
    );
});

const pointFormatter = computed(() => {
    if (props.activeOption.propName.includes("temp_")) {
        return (value: string) => value + "°";
    } else return;
});

const conditionRange = computed(() => {
    return props.hourlyForecast.map((item) => item.condition);
});

const data = computed(() => {
    return {
        labels: tickLabels.value,
        datasets: [
            {
                backgroundColor: colors["accent-300"],
                data: chartData.value,
            },
        ],
    };
});

const hourlyForecastContainer = ref<HTMLElement | null>(null);

// makes container scrollable by dragging
useDraggableScroll(hourlyForecastContainer);

const scrollOnWheel = function (e: WheelEvent) {
    if (hourlyForecastContainer.value) {
        hourlyForecastContainer.value.scrollLeft += e.deltaY / 4;
    }
};

const chartOptions = computed(() => {
    return {
        layout: {
            padding: {
                top: 20,
            },
        },
        scales: scalesConfiguration,
        plugins: {
            datalabels: {
                formatter: pointFormatter.value,
            },
        },
    };
});
</script>

<template>
    <div
        ref="hourlyForecastContainer"
        class="hourly-forecast-chart"
        @wheel.prevent="scrollOnWheel"
    >
        <div class="hourly-forecast-chart__chart-container">
            <LineChart :data="data" :options="chartOptions" />
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

    &__chart-container {
        width: 1000px;
        min-width: 1000px;
        cursor: grab;

        &:active {
            cursor: grabbing;
        }
    }
}

@media screen and (min-width: 600px) {
    .hourly-forecast-chart {
        margin-left: 0;
        width: 100%;
    }
}
</style>
