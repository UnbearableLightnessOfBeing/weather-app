<script setup lang="ts">
defineProps<{
    current: any;
    isLoading: boolean;
    isError: boolean;
}>();

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
        <div v-if="isLoading" class="main-info__loading">Loading...</div>
        <div v-else-if="current && !isError" class="main-info__content">
            <BasicTemperature :value="current.temp_c" :measurement="'C'" />
            <CurrentDateInfo :language="'en'" :unix-date="unixCurrentDate" />
            <BasicWeatherStats
                :wind-speed="current.wind_kph"
                :wind-degree="current.wind_degree"
                :humidity="current.humidity"
                :percipitations="current.precip_in"
            />
        </div>
        <div v-else class="main-info__error">Error</div>
    </div>
</template>

<style scoped lang="scss">
.main-info {
    &__content {
        & > * + * {
            margin-top: 25px;
        }
    }
}
</style>
