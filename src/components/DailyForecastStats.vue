<script setup lang="ts">
import type { DailyForecast } from "../types/requestTypes";

defineProps<{
    dailyForecast?: DailyForecast;
    isLoading: boolean;
}>();
</script>

<template>
    <div class="daily-forecast-stats">
        <DailyForecastAstro
            :astro="dailyForecast?.astro"
            :is-loading="isLoading"
        />
        <div class="daily-forecast-stats__hourly-forecast">
            <HorizontalDivider />
            <HourlyForecastData
                :hourly-forecast="dailyForecast?.hour"
                :is-loading="isLoading"
            />
            <HorizontalDivider />
        </div>
        <QualityCards
            :air-quality="dailyForecast?.day?.air_quality"
            :uv-index="dailyForecast?.day?.uv"
            :is-loading="isLoading"
        />
    </div>
</template>

<style scoped lang="scss">
.daily-forecast-stats {
    padding: 16px;
    & > * + * {
        margin-top: 20px;
    }

    &__hourly-forecast {
        & > * + * {
            margin-top: 10px;
        }
    }
}

@media screen and (min-width: 1440px) {
    .daily-forecast-stats {
        padding-inline: 66px;
        padding-block: 40px;
        & > * + * {
            margin-top: 30px;
        }
    }
}
</style>
