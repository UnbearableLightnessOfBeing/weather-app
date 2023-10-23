import { useDateFormat } from "@vueuse/core";
import { HourlyWeather } from "../types/requestTypes";
import {
    scalesConfiguration,
    modalScalesConfiguration,
} from "../configs/chartjsConfig";
import type {
    ExtendedWeatherCondition,
    HourlyWeatherNumberKey,
} from "../types/requestTypes";
import type { ChartData, ChartOptions } from "chart.js";
import { useLocale } from "./useLocale";
import { LocaleNameEnum } from "../configs/i18nConfig";

export const ChartTypeEnum = {
    Type1: "default",
    Type2: "modal",
} as const;

type EnumObjValues<T> = T[keyof T];
type ChartTypeEnumValues = EnumObjValues<typeof ChartTypeEnum>;

export const useChartData = (
    hourlyForecast: ComputedRef<HourlyWeather[]>,
    chartType: ChartTypeEnumValues = ChartTypeEnum.Type1,
) => {
    const { locale } = useLocale();

    const conditionRange = computed<ExtendedWeatherCondition[]>(() => {
        return hourlyForecast.value.map((item) => {
            return {
                ...item.condition,
                is_day: Boolean(item.is_day),
            };
        });
    });

    const dateFormat = computed(() => {
        return locale.value === LocaleNameEnum.Ru ? "HH:mm" : "h A";
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
                    chartType === ChartTypeEnum.Type1
                        ? { top: 20 }
                        : { left: 20, right: 20 },
            },
            scales:
                chartType === ChartTypeEnum.Type1
                    ? scalesConfiguration
                    : modalScalesConfiguration,
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
