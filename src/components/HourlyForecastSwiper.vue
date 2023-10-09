<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import colors from "../assets/colors/colors.json";
import { HourlyWeather } from "../types/requestTypes";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "vue-chartjs";
import { useI18n } from "vue-i18n";
import { useMeasurement } from "../composables/useMeasurement";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
);

const props = defineProps<{
    hourlyForecast: HourlyWeather[];
}>();

const { locale } = useI18n();

const { measurement } = useMeasurement();

const dateFormat = computed(() => {
    return locale.value === "ru" ? "HH:mm" : "h A";
});

const labelHours = computed(() => {
    return props.hourlyForecast.map((item) => {
        const date = new Date(item.time);
        const formatted = useDateFormat(date, dateFormat.value, {
            locales: "en-US",
        });
        return formatted.value;
    });
});

const tempData = computed(() => {
    return props.hourlyForecast.map((item) => {
        return measurement.value === "C" ? item.temp_c : item.temp_f;
    });
});

const data = computed(() => {
    return {
        labels: labelHours.value,
        datasets: [
            {
                label: "ab",
                backgroundColor: colors["accent-300"],
                data: tempData.value,
            },
        ],
    };
});

const container = ref<HTMLElement | null>();

let pos = reactive({ left: 0, x: 0 });

const mouseDownHandler = (e: MouseEvent) => {
    if (container.value) {
        container.value.style.userSelect = "none";
        pos.left = container.value.scrollLeft;
        pos.x = e.clientX;
    }

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
};

const mouseMoveHandler = (e: MouseEvent) => {
    if (container.value) {
        const dx = e.clientX - pos.x;
        container.value.scrollLeft = pos.left - dx;
    }
};

const mouseUpHandler = () => {
    if (container.value) {
        container.value.style.removeProperty("user-select");
    }
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
};
</script>

<template>
    <div ref="container" class="hourly-forecast-swiper">
        <div
            class="hourly-forecast-swiper__chart-container"
            @mousedown="mouseDownHandler"
        >
            <!-- <div
                v-for="hour in hourlyForecast"
                :key="hour.time_epoch"
                class="hourly-forecast-swiper__hour"
            ></div> -->
            <Line
                :data="data"
                :options="{
                    responsive: true,
                    maintainAspectRatio: false,
                    borderColor: colors['basic-light-dull'],
                    layout: {
                        padding: 16,
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: false,
                        },
                        datalabels: {
                            color: colors['basic-light'],
                            anchor: 'end',
                            align: 'top',
                            offset: 2,
                            formatter: (value) => {
                                return value + '°';
                            },
                        },
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false,
                    },
                    elements: {
                        point: {
                            pointStyle: 'circle',
                        },
                    },
                    scales: {
                        y: {
                            display: false,
                        },
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                    },
                }"
                class="hourly-forecast-swiper__chart"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.hourly-forecast-swiper {
    height: 200px;

    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    overflow-x: scroll;

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
        border: 1px solid blue;
        height: 100%;
        display: flex;
        width: 1000px;
        min-width: 1000px;
        cursor: grab;

        &:active {
            cursor: grabbing;
        }
    }

    &__chart {
    }
}
</style>
