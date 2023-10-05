<script setup lang="ts">
import type { DailyForecast } from "../types/requestTypes";

defineProps<{
    dailyForecast: DailyForecast;
}>();
</script>

<template>
    <div class="daily-forecast-stats">
        <DailForecastAstrology :astro="dailyForecast.astro" />
    </div>
</template>

<style scoped lang="scss">
.daily-forecast-stats {
    padding: 10px;
    border: 1px solid red;
}
</style>
