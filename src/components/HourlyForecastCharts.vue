<script setup lang="ts">
import { HourlyWeather } from "../types/requestTypes";
import { useDateFormat } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import colors from "../assets/colors/colors.json";
import { scalesConfigurationSecond } from "../configs/chartjsConfig";
import { useDraggableScroll } from "../composables/useDraggableScroll";
import { useMeasurement } from "../composables/useMeasurement";
import { ChartData } from "chart.js";

const props = defineProps<{
    hourlyForecast: HourlyWeather[];
}>();

const { t, locale } = useI18n();

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

//general type
// type ExtractPropKeys<T, PropType extends T[keyof T]> = {
//     [P in keyof T]: T[P] extends PropType ? P : never;
// }[keyof T];

//more specific
type ExtractNumberPropKeys<T> = {
    [P in keyof T]: T[P] extends number ? P : never;
}[keyof T];

type ChartInfoItem = {
    propName: ExtractNumberPropKeys<HourlyWeather>;
    optionName: string;
    //eslint-disable-next-line
    formatter: (value: any) => any;
    dataset: ChartData<"line">;
};

const chartInfo = computed<ChartInfoItem[]>(() => {
    return [
        {
            propName: measurement.value === "C" ? "temp_c" : "temp_f",
            optionName: t("chartOptions.temp"),
            formatter: (value: string) => value + "°",
            dataset: getChartData(
                measurement.value === "C" ? "temp_c" : "temp_f",
            ),
        },
        {
            propName: measurement.value === "C" ? "feelslike_c" : "feelslike_f",
            optionName: t("chartOptions.feelslike"),
            formatter: (value: string) => value + "°",
            dataset: getChartData(
                measurement.value === "C" ? "feelslike_c" : "feelslike_f",
            ),
        },
        {
            propName: "precip_mm",
            optionName: t("chartOptions.precip"),
            formatter: (value: string) => value,
            dataset: getChartData("precip_mm"),
        },
        {
            propName: "chance_of_rain",
            optionName: t("chartOptions.rainChance"),
            formatter: (value: string) => value,
            dataset: getChartData("chance_of_rain"),
        },
        {
            propName: "chance_of_snow",
            optionName: t("chartOptions.snowChance"),
            formatter: (value: string) => value,
            dataset: getChartData("chance_of_snow"),
        },
        {
            propName: "wind_kph",
            optionName: t("chartOptions.wind"),
            formatter: (value: string) => value,
            dataset: getChartData("wind_kph"),
        },
        {
            propName: "gust_kph",
            optionName: t("chartOptions.gust"),
            formatter: (value: string) => value,
            dataset: getChartData("gust_kph"),
        },
        {
            propName: "pressure_mb",
            optionName: t("chartOptions.pressure"),
            formatter: (value: string) => value,
            dataset: getChartData("pressure_mb"),
        },
        {
            propName: "humidity",
            optionName: t("chartOptions.humidity"),
            formatter: (value: string) => value,
            dataset: getChartData("humidity"),
        },
        {
            propName: measurement.value === "C" ? "dewpoint_c" : "dewpoint_f",
            optionName: t("chartOptions.dewPoint"),
            formatter: (value: string) => value + "°",
            dataset: getChartData(
                measurement.value === "C" ? "dewpoint_c" : "dewpoint_f",
            ),
        },
        {
            propName: "uv",
            optionName: t("chartOptions.uv"),
            formatter: (value: string) => value,
            dataset: getChartData("uv"),
        },
        {
            propName: "vis_km",
            optionName: t("chartOptions.visibility"),
            formatter: (value: string) => value,
            dataset: getChartData("vis_km"),
        },
    ];
});

// const chartDataSets = computed(() => {
//     return chartInfo.value.map((chartItem) => {
//         // return props.hourlyForecast.map((hour) => {
//         //     return hour[chartItem.propName];
//         // });
//         return getChartData(chartItem.propName);
//     });
// });

const getChartData = (propName: ExtractNumberPropKeys<HourlyWeather>) => {
    const datasets = props.hourlyForecast.map((hourly) => hourly[propName]);

    return datasets.map((dataset) => {
        return {
            labels: tickLabels.value,
            datasets: [
                {
                    backgroundColor: colors["accent-300"],
                    data: dataset,
                },
            ],
        };
    });
};

// const dataSets = computed(() => {
//     return chartDataSets.value.map((dataset) => {
//         return {
//             labels: tickLabels.value,
//             datasets: [
//                 {
//                     backgroundColor: colors["accent-300"],
//                     data: dataset,
//                 },
//             ],
//         };
//     });
// });

const chartOptions = computed(() => {
    return chartInfo.value.map((chartItem) => {
        return {
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                },
            },
            scales: scalesConfigurationSecond,
            plugins: {
                datalabels: {
                    formatter: chartItem.formatter,
                },
            },
        };
    });
});

const conditionRange = computed(() => {
    return props.hourlyForecast.map((item) => item.condition);
});

const mainContainer = ref<HTMLElement | null>(null);
const option = ref<HTMLElement[] | null>(null);

useDraggableScroll(mainContainer);

const setAbsolute = () => {
    const offset = mainContainer.value?.scrollLeft ?? 0;
    if (option.value) {
        option.value.forEach((el) => {
            el.style.left = `${20 + offset}px`;
        });
    }
};
</script>

<template>
    <div class="hourly-forecast-charts-wrapper">
        <div
            ref="mainContainer"
            class="hourly-forecast-charts"
            @scroll="setAbsolute"
        >
            <div class="hourly-forecast-charts__top-info">
                <ConditionIconRange
                    :conditions="conditionRange"
                    :width="1200"
                />
                <div class="time">
                    <div
                        v-for="value in tickLabels"
                        :key="value"
                        class="time__stamp"
                    >
                        {{ value }}
                    </div>
                </div>
            </div>
            <div class="hourly-forecast-charts__container">
                <div
                    v-for="(dataset, idx) in dataSets"
                    :key="idx"
                    class="hourly-forecast-charts__option"
                >
                    <div
                        ref="option"
                        class="hourly-forecast-charts__option-text"
                    >
                        {{ chartInfo[idx].optionName }}
                    </div>
                    <BasicChart
                        :data="dataset"
                        :options="chartOptions[idx]"
                        class="hourly-forecast-charts__option-chart"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.time {
    display: flex;
    width: 1200px;
    justify-content: space-between;
    font-size: 12px;
    padding-inline: 5px;
}

.hourly-forecast-charts-wrapper {
    overflow: hidden;
}
.hourly-forecast-charts {
    max-width: 1204px;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(200deg, #8c6bae 0%, #8c6bae 100%);
    backdrop-filter: blur(5px);
    overflow-x: scroll;
    position: relative;

    &__top-info {
        width: 1200px;
        position: sticky;
        top: 0;
        background-color: var(--basic-light-dull);
        backdrop-filter: blur(5px);
        z-index: 1;
        padding-block: 5px;
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

        &-text {
            position: absolute;
            left: 20px;
            top: 5px;
            font-size: var(--fs-stats);
        }

        &-chart {
            height: 150px;
        }
    }
}

@media screen and (min-width: 1440px) {
    .hourly-forecast-charts-wrapper {
        border-radius: 20px;
    }
    .hourly-forecast-charts {
        height: 800px;
        overflow-x: hidden;
    }
}
</style>
