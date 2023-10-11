<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import colors from "../assets/colors/colors.json";
import { HourlyWeather } from "../types/requestTypes";
import { useI18n } from "vue-i18n";
import { useMeasurement } from "../composables/useMeasurement";
import { useDraggableScroll } from "../composables/useDraggableScroll";

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
    id: number;
    name: ChartOptionName;
    measurement: string;
};

const props = defineProps<{
    hourlyForecast: HourlyWeather[];
    activeOption: ChartOption;
}>();

const { locale } = useI18n();

const { measurement } = useMeasurement();

const dateFormat = computed(() => {
    return locale.value === "ru" ? "HH:mm" : "h A";
});

const tickLabels = computed(() => {
    return props.hourlyForecast.map((item) => {
        const date = new Date(item.time);
        const formatted = useDateFormat(date, dateFormat.value, {
            locales: "en-US",
        });
        return formatted.value;
    });
});

const chartData = computed(() => {
    if (props.activeOption.id === 2) {
        return props.hourlyForecast.map((item) => item.precip_mm);
    } else if (props.activeOption.id === 3) {
        return props.hourlyForecast.map((item) => item.wind_kph);
    } else if (props.activeOption.id === 4) {
        return props.hourlyForecast.map((item) => item.pressure_mb);
    } else {
        return props.hourlyForecast.map((item) => {
            return measurement.value === "C" ? item.temp_c : item.temp_f;
        });
    }
});

const pointFormatter = computed(() => {
    if (props.activeOption.name === "temp.") {
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

const container = ref<HTMLElement | null>(null);

// makes container scrollable by dragging
useDraggableScroll(container);

const scrollOnWheel = function (e: WheelEvent) {
    if (container.value) {
        container.value.scrollLeft += e.deltaY / 4;
    }
};
</script>

<template>
    <div
        ref="container"
        class="hourly-forecast-chart"
        @wheel.prevent="scrollOnWheel"
    >
        <div class="hourly-forecast-chart__chart-container">
            <BasicChart :data="data" :point-formatter="pointFormatter" />
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

    &::-webkit-scrollbar {
        width: 2px;
        height: 2px;

        &-track {
            background-color: transparent;
        }

        &-thumb {
            border-radius: 20px;
            background-color: var(--basic-light-dull);
        }
    }

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
