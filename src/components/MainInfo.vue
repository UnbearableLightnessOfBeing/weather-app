<script setup lang="ts">
import { useMeasurement } from "../composables/useMeasurement";
import { useI18n } from "vue-i18n";
import type { CurrentWeather } from "../types/requestTypes";

defineProps<{
    current?: CurrentWeather;
    isLoading: boolean;
}>();

const i18n = useI18n();
const locale = computed(() => {
    return i18n.locale.value as "en" | "ru";
});

const { measurement } = useMeasurement();

const unixCurrentDate = ref(new Date());

let interval: number = 0;

onMounted(() => {
    interval = setInterval(() => {
        unixCurrentDate.value = new Date();
    }, 1000);
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>

<template>
    <div class="main-info">
        <div class="main-info__content">
            <BasicLoader v-if="isLoading" class="main-info__temp-loader" />
            <BasicTemperature
                v-else-if="current"
                :value="measurement === 'C' ? current.temp_c : current.temp_f"
                :measurement="measurement"
            />
            <BasicNodata v-else class="main-info__temp-no-data" />
            <CurrentDateInfo :language="locale" :unix-date="unixCurrentDate" />
            <BasicLoader v-if="isLoading" class="main-info__stats-loader" />
            <BasicWeatherStats
                v-else-if="current"
                :wind-speed="current.wind_kph"
                :wind-degree="current.wind_degree"
                :humidity="current.humidity"
                :percipitations="current.precip_in"
            />
            <BasicNodata v-else class="main-info__stats-no-data" />
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

    &__temp-loader,
    &__temp-no-data {
        width: 165px;
        height: 115px;
    }

    &__stats-loader,
    &__stats-no-data {
        height: 89px;
    }
}

@media screen and (min-width: 600px) {
    .main-info {
        &__stats-loader,
        &__stats-no-data {
            height: 26px;
        }

        &__temp-loader,
        &__temp-no-data {
            width: 197px;
            height: 197px;
        }
    }
}
</style>
