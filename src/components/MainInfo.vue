<script setup lang="ts">
import { useMeasurement } from "../composables/useMeasurement";
import { useLocale } from "../composables/useLocale";
import type { CurrentWeather, LocationType } from "../types/requestTypes";

const props = defineProps<{
    current?: CurrentWeather;
    location?: LocationType;
    isLoading: boolean;
}>();

const { locale } = useLocale();

const { measurement } = useMeasurement();

const computedTemperature = computed(() => {
    if (props.current) {
        return measurement.value === "C"
            ? props.current.temp_c
            : props.current.temp_f;
    } else return undefined;
});

const stats = computed(() => {
    if (props.current) {
        return {
            windDegree: props.current.wind_degree,
            windSpeed: props.current.wind_kph,
            humidity: props.current.humidity,
            percipitations: props.current.precip_mm,
        };
    } else return undefined;
});
</script>

<template>
    <div class="main-info">
        <div class="main-info__content">
            <BasicTemperature
                :value="computedTemperature"
                :measurement="measurement"
                :is-loading="isLoading"
            />
            <LocalTimeComputer
                v-slot="{ currentDate }"
                :localtime="location?.localtime"
                :is-loading="isLoading"
            >
                <CurrentDateInfo
                    :language="locale"
                    :unix-date="currentDate"
                    :is-loading="isLoading"
                />
            </LocalTimeComputer>
            <BasicWeatherStats :stats="stats" :is-loading="isLoading" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-info {
    &__content {
        & > * + * {
            margin-top: 15px;
        }
    }
}
</style>
