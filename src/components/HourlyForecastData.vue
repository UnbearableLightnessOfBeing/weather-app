<script setup lang="ts">
import { HourlyWeather } from "../types/requestTypes";
import { useI18n } from "vue-i18n";
import type { ChartOption } from "./HourlyForecastChart.vue";
import { useMeasurement } from "../composables/useMeasurement";

defineProps<{
    hourlyForecast: HourlyWeather[];
}>();

const { t, locale } = useI18n();

const { measurement } = useMeasurement();

const options = computed<ChartOption[]>(() => {
    return [
        {
            propName: measurement.value === "C" ? "temp_c" : "temp_f",
            name: locale.value === "ru" ? "температура" : "temp.",
            measurement: measurement.value === "C" ? "°C" : "°F",
        },
        {
            propName: "precip_mm",
            name: locale.value === "ru" ? "осадки" : "precip.",
            measurement: t("measurements.mm"),
        },
        {
            propName: "wind_kph",
            name: locale.value === "ru" ? "ветер" : "wind",
            measurement: t("measurements.kmh"),
        },
        {
            propName: "pressure_mb",
            name: locale.value === "ru" ? "давление" : "pressure",
            measurement: "hPa",
        },
    ];
});

const activeOption = ref(options.value[0]);

const isModalOpen = ref(false);
</script>

<template>
    <div class="hourly-forecast-data">
        <ForecastHeading
            :title="t('chart.hourly')"
            @open-modal="isModalOpen = true"
        />
        <HourlyForecastChart
            :hourly-forecast="hourlyForecast"
            :active-option="activeOption"
        />
        <ForecastOptions
            v-model:active-option="activeOption"
            :options="options"
        />
        <BasicModal v-model:is-open="isModalOpen">
            <HourlyForecastCharts :hourly-forecast="hourlyForecast" />
        </BasicModal>
    </div>
</template>

<style scoped lang="scss">
.hourly-forecast-data {
    & > * + * {
        margin-top: 5px;
    }
}
</style>
