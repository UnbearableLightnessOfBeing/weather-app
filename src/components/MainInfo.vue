<script setup lang="ts">
import { useMeasurement } from "../composables/useMeasurement";
import type { CurrentWeather } from "../types/requestTypes";

defineProps<{
    current?: CurrentWeather;
}>();

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
            <BasicLoader v-if="!current" class="main-info__temp-loader" />
            <BasicTemperature
                v-else
                :value="measurement === 'C' ? current.temp_c : current.temp_f"
                :measurement="measurement"
            />
            <CurrentDateInfo :language="'en'" :unix-date="unixCurrentDate" />
            <BasicLoader v-if="!current" class="main-info__stats-loader" />
            <BasicWeatherStats
                v-else
                :wind-speed="current.wind_kph"
                :wind-degree="current.wind_degree"
                :humidity="current.humidity"
                :percipitations="current.precip_in"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-info {
    &__content {
        & > * + * {
            margin-top: 25px;
        }
    }

    &__temp-loader {
        width: 165px;
        height: 115px;
    }

    &__stats-loader {
        height: 89px;
    }
}

@media screen and (min-width: 600px) {
    .main-info {
        &__stats-loader {
            height: 26px;
        }

        &__temp-loader {
            width: 197px;
            height: 197px;
        }
    }
}
</style>
