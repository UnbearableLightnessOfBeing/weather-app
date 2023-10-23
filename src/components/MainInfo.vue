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

const unixCurrentDate = ref<Date | undefined>(undefined);

const setDate = (diffInHours: number) => {
    unixCurrentDate.value = new Date(
        new Date().getTime() - diffInHours * 60 * 60 * 1000,
    );
};

let interval: number = 0;

const setUnixCurrentDate = () => {
    if (props.location && props.location.localtime) {
        const localTime = new Date(props.location.localtime).getTime();
        const now = new Date().getTime();
        const diffInHours = Math.round((now - localTime) / (1000 * 60 * 60));
        setDate(diffInHours);
        interval = setInterval(() => {
            setDate(diffInHours);
        }, 1000);
    }
};

watch(
    () => props.isLoading,
    () => {
        clearInterval(interval);
        setUnixCurrentDate();
    },
);

onMounted(() => {
    setUnixCurrentDate();
});

onUnmounted(() => {
    clearInterval(interval);
});

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
            <CurrentDateInfo
                :language="locale"
                :unix-date="unixCurrentDate"
                :is-loading="isLoading"
            />
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
