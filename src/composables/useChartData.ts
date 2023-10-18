import { useDateFormat } from "@vueuse/core";
import { HourlyWeather } from "../types/requestTypes";
import { useI18n } from "vue-i18n";
import {
    scalesConfiguration,
    scalesConfigurationSecond,
} from "../configs/chartjsConfig";
import type {
    ExtendedWeatherCondition,
    HourlyWeatherNumberKey,
} from "../types/requestTypes";
import type { ChartData, ChartOptions } from "chart.js";

export const useChartData = (
    hourlyForecast: ComputedRef<HourlyWeather[]>,
    chartType: "default" | "modal" = "default",
) => {
    const { locale } = useI18n();

    const conditionRange = computed<ExtendedWeatherCondition[]>(() => {
        return hourlyForecast.value.map((item) => {
            return {
                ...item.condition,
                is_day: Boolean(item.is_day),
            };
        });
    });

    const dateFormat = computed(() => {
        return locale.value === "ru" ? "HH:mm" : "h A";
    });

    const tickLabels = computed(() => {
        return hourlyForecast.value.map(
            (item) =>
                useDateFormat(new Date(item.time), dateFormat.value).value,
        );
    });

    const deriveFormatter = (propName: HourlyWeatherNumberKey) => {
        if (
            propName.includes("temp_") ||
            propName.includes("feelslike_") ||
            propName.includes("dewpoint_")
        ) {
            return (value: string) => value + "°";
        } else return (value: string) => value;
    };

    const getChartOptions = (
        propName: HourlyWeatherNumberKey,
    ): ChartOptions<"line"> => {
        return {
            layout: {
                padding:
                    chartType === "default"
                        ? { top: 20 }
                        : { left: 20, right: 20 },
            },
            scales:
                chartType === "default"
                    ? scalesConfiguration
                    : scalesConfigurationSecond,
            plugins: {
                datalabels: {
                    formatter: deriveFormatter(propName),
                },
            },
        };
    };

    const getChartData = (
        propName: HourlyWeatherNumberKey,
        fillColor: string,
    ): ChartData<"line"> => {
        return {
            labels: tickLabels.value,
            datasets: [
                {
                    // backgroundColor: colors["accent-300"],
                    backgroundColor: fillColor,
                    data: hourlyForecast.value.map(
                        (hourly) => hourly[propName],
                    ),
                    fill: "origin",
                },
            ],
        };
    };

    return {
        conditionRange,
        tickLabels,
        getChartOptions,
        getChartData,
    };
};
