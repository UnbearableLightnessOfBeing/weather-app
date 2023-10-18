<script setup lang="ts">
import { HourlyWeather } from "../types/requestTypes";
import { useI18n } from "vue-i18n";
import { useDraggableScroll } from "../composables/useDraggableScroll";
import { useMeasurement } from "../composables/useMeasurement";
import { ChartData } from "chart.js";
import { useChartData } from "../composables/useChartData";
import type { HourlyWeatherNumberKey } from "../types/requestTypes";
import { Line as LineChart } from "vue-chartjs";
import { ChartOptions } from "chart.js";
import InlineSvg from "vue-inline-svg";
import ArrowSvgUrl from "/interface/x-mark.svg";
import colors from "../assets/colors/colors.json";
import gsap from "gsap";

const props = defineProps<{
    hourlyForecast: HourlyWeather[];
}>();

defineEmits<{
    //eslint-disable-next-line
    (e: "closeModal"): void;
}>();

const getChartIcon = (name: string): string => {
    const host = new URL("", import.meta.url).origin;
    const base = import.meta.env.BASE_URL;
    const iconPath = host + base + "/interface/charts" + `/${name}.svg`;
    return iconPath;
};

const { t } = useI18n();

const { measurement } = useMeasurement();

const { conditionRange, tickLabels, getChartOptions, getChartData } =
    useChartData(
        computed(() => props.hourlyForecast),
        "modal",
    );

type ChartInfoItem = {
    propName: HourlyWeatherNumberKey;
    optionName: string;
    measurement: string;
    icon: string;
    dataset: ChartData<"line">;
    options: ChartOptions<"line">;
};

const chartInfo = computed<ChartInfoItem[]>(() => {
    return [
        {
            propName: measurement.value === "C" ? "temp_c" : "temp_f",
            optionName: t("chartOptions.temp"),
            measurement: measurement.value === "C" ? "°C" : "°F",
            icon: getChartIcon("temperature"),
            dataset: getChartData(
                measurement.value === "C" ? "temp_c" : "temp_f",
                colors["chart-warm"],
            ),
            options: getChartOptions(
                measurement.value === "C" ? "temp_c" : "temp_f",
            ),
        },
        {
            propName: measurement.value === "C" ? "feelslike_c" : "feelslike_f",
            optionName: t("chartOptions.feelslike"),
            measurement: measurement.value === "C" ? "°C" : "°F",
            icon: getChartIcon("feelslike"),
            dataset: getChartData(
                measurement.value === "C" ? "feelslike_c" : "feelslike_f",
                colors["chart-warm"],
            ),
            options: getChartOptions(
                measurement.value === "C" ? "feelslike_c" : "feelslike_f",
            ),
        },
        {
            propName: "precip_mm",
            optionName: t("chartOptions.precip"),
            measurement: t("measurements.mm"),
            icon: getChartIcon("precip"),
            dataset: getChartData("precip_mm", colors["chart-water"]),
            options: getChartOptions("precip_mm"),
        },
        {
            propName: "chance_of_rain",
            optionName: t("chartOptions.rainChance"),
            measurement: "%",
            icon: getChartIcon("rain-chance"),
            dataset: getChartData("chance_of_rain", colors["chart-water"]),
            options: getChartOptions("chance_of_rain"),
        },
        {
            propName: "chance_of_snow",
            optionName: t("chartOptions.snowChance"),
            measurement: "%",
            icon: getChartIcon("snow-chance"),
            dataset: getChartData("chance_of_snow", colors["chart-wind"]),
            options: getChartOptions("chance_of_snow"),
        },
        {
            propName: "wind_kph",
            optionName: t("chartOptions.wind"),
            measurement: t("measurements.kmh"),
            icon: getChartIcon("wind"),
            dataset: getChartData("wind_kph", colors["chart-wind"]),
            options: getChartOptions("wind_kph"),
        },
        {
            propName: "gust_kph",
            optionName: t("chartOptions.gust"),
            measurement: t("measurements.kmh"),
            icon: getChartIcon("gust"),
            dataset: getChartData("gust_kph", colors["chart-wind"]),
            options: getChartOptions("gust_kph"),
        },
        {
            propName: "pressure_mb",
            optionName: t("chartOptions.pressure"),
            measurement: "hPa",
            icon: getChartIcon("pressure"),
            dataset: getChartData("pressure_mb", colors["chart-pressure"]),
            options: getChartOptions("pressure_mb"),
        },
        {
            propName: "humidity",
            optionName: t("chartOptions.humidity"),
            measurement: "%",
            icon: getChartIcon("humidity"),
            dataset: getChartData("humidity", colors["chart-water"]),
            options: getChartOptions("humidity"),
        },
        {
            propName: measurement.value === "C" ? "dewpoint_c" : "dewpoint_f",
            optionName: t("chartOptions.dewPoint"),
            measurement: measurement.value === "C" ? "°C" : "°F",
            icon: getChartIcon("dew-point"),
            dataset: getChartData(
                measurement.value === "C" ? "dewpoint_c" : "dewpoint_f",
                colors["chart-water"],
            ),
            options: getChartOptions(
                measurement.value === "C" ? "dewpoint_c" : "dewpoint_f",
            ),
        },
        {
            propName: "uv",
            optionName: t("chartOptions.uv"),
            measurement: "",
            icon: getChartIcon("uv"),
            dataset: getChartData("uv", colors["chart-uv"]),
            options: getChartOptions("uv"),
        },
        {
            propName: "vis_km",
            optionName: t("chartOptions.visibility"),
            measurement: t("measurements.km"),
            icon: getChartIcon("visibility"),
            dataset: getChartData("vis_km", colors["chart-wind"]),
            options: getChartOptions("vis_km"),
        },
    ];
});

const mainContainer = ref<HTMLElement | null>(null);

useDraggableScroll(mainContainer);

const optionOffset = ref("20px");

const setOptionOffset = () => {
    const offset = mainContainer.value?.scrollLeft ?? 0;
    optionOffset.value = `${20 + offset}px`;
};

function onEnter(el: any, done: any) {
    gsap.from(el, {
        opacity: 0,
        x: el.dataset.index % 2 === 0 ? -600 : 600,
        delay: 0.3 + el.dataset.index * 0.15,
        duration: 0.6,
        onComplete: done,
    });
}
</script>

<template>
    <div class="hourly-forecast-charts">
        <InlineSvg
            :src="ArrowSvgUrl"
            class="hourly-forecast-charts__close-btn"
            @click="$emit('closeModal')"
        />
        <div
            ref="mainContainer"
            class="hourly-forecast-charts__inner"
            @scroll="setOptionOffset"
        >
            <div class="hourly-forecast-charts__top-info">
                <ConditionIconRange
                    :conditions="conditionRange"
                    :width="1200"
                />
                <TimeLabelRange :time-labels="tickLabels" />
            </div>
            <div class="hourly-forecast-charts__container">
                <TransitionGroup name="charts" appear @enter="onEnter">
                    <div
                        v-for="(chart, idx) in chartInfo"
                        :key="chart.propName"
                        :data-index="idx"
                        class="hourly-forecast-charts__option"
                    >
                        <ChartTitle
                            :icon-src="chart.icon"
                            :title="chart.optionName"
                            :measurement="chart.measurement"
                            class="hourly-forecast-charts__option-title"
                        />
                        <LineChart
                            :data="chart.dataset"
                            :options="chart.options"
                            class="hourly-forecast-charts__option-chart"
                        />
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.hourly-forecast-charts {
    overflow: hidden;

    &__inner {
        max-width: 1204px;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(200deg, #8c6bae 0%, #8c6bae 100%);
        backdrop-filter: blur(5px);
        overflow-x: scroll;
        position: relative;
    }

    &__top-info {
        width: 1200px;
        position: sticky;
        top: 0;
        background-color: var(--basic-light-dull);
        backdrop-filter: blur(5px);
        z-index: 1;
        padding-bottom: 5px;
        padding-top: 45px;
    }

    &__close-btn {
        position: fixed;
        z-index: 2;
        top: 0;
        right: 0;
        width: 40px;
        height: 40px;
        padding-inline: 5px;
    }

    &__container {
        width: 1200px;
        overflow: auto;

        & > * + * {
            margin-top: -4px;
        }
    }

    &__option {
        position: relative;

        &-title {
            position: absolute;
            left: v-bind(optionOffset);
            top: 5px;
        }

        &-chart {
            height: 150px;
        }
    }
}

@media screen and (min-width: 1440px) {
    .hourly-forecast-charts {
        border-radius: 5px;

        &__inner {
            height: 800px;
            overflow-x: hidden;
        }

        &__top-info {
            padding-block: 5px;
        }

        &__close-btn {
            display: none;
        }
    }
}
</style>
