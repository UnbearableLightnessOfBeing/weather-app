<script setup lang="ts">
import type { DailyForecast } from "../types/requestTypes";

defineProps<{
    dailyForecast: DailyForecast;
}>();
</script>

<template>
    <div class="daily-forecast-stats">
        <DailForecastAstro :astro="dailyForecast?.astro" />
        <div class="daily-forecast-stats__hourly-forecast">
            <BasicHorizontalDivider />
            <HourlyForecastSwiper :hourly-forecast="dailyForecast.hour" />
            <BasicHorizontalDivider />
        </div>
        <QualityCards
            :air-quality="dailyForecast?.day?.air_quality"
            :uv-index="dailyForecast?.day?.uv"
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
