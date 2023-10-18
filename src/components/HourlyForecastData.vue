<script setup lang="ts">
import { HourlyWeather } from "../types/requestTypes";
import { useI18n } from "vue-i18n";
import type { ChartOption } from "./HourlyForecastChart.vue";
import { useMeasurement } from "../composables/useMeasurement";

defineProps<{
    hourlyForecast?: HourlyWeather[];
    isLoading: boolean;
}>();

const { t, locale } = useI18n();

const { measurement } = useMeasurement();

const options = computed<ChartOption[]>(() => [
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
]);

const activeOption = ref<ChartOption>(options.value[0]);

watch(options, () => {
    if (activeOption.value.propName.includes("temp_")) {
        activeOption.value = options.value[0];
    }
});

const isModalOpen = ref(false);
</script>

<template>
    <div class="hourly-forecast-data">
        <ForecastHeading
            v-if="!isLoading && hourlyForecast"
            :title="t('chart.hourly')"
            @open-modal="isModalOpen = true"
        />
        <BasicLoader v-if="isLoading" class="hourly-forecast-data__loader" />
        <HourlyForecastChart
            v-else-if="hourlyForecast"
            :hourly-forecast="hourlyForecast"
            :active-option="activeOption"
        />
        <BasicNodata v-else class="hourly-forecast-data__no-data" />
        <ForecastOptions
            v-if="!isLoading && hourlyForecast"
            v-model:active-option="activeOption"
            :options="options"
        />
        <BasicModal v-if="hourlyForecast" v-model:is-open="isModalOpen">
            <HourlyForecastCharts
                :hourly-forecast="hourlyForecast"
                @close-modal="isModalOpen = false"
            />
        </BasicModal>
    </div>
</template>

<style scoped lang="scss">
.hourly-forecast-data {
    & > * + * {
        margin-top: 5px;
    }

    &__loader,
    &__no-data {
        width: 100%;
        height: 252px;
    }
}
</style>
