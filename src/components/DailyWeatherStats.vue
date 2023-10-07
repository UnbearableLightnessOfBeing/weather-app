<script setup lang="ts">
import RainSvgUrl from "/stats/rain.svg";
import WindSvgUrl from "/interface/wind-gust.svg";
import HumiditySvgUrl from "/stats/humidity.svg";
import VisibilitySvgUrl from "/interface/visibility.svg";
import SnowChanceSvgUrl from "/stats/snow-chance.svg";
import RainChanceSvgUrl from "/stats/rain-chance.svg";
import { DailyWeather } from "../types/requestTypes";
import { useI18n } from "vue-i18n";

defineProps<{
    stats: DailyWeather;
}>();

const { t } = useI18n();
</script>

<template>
    <div class="daily-weather-stats">
        <BasicDailyWeatherStat
            :icon-src="RainSvgUrl"
            :title="t('weatherStats.precipitation')"
            :value="stats.totalprecip_mm"
            :measurement="t('measurements.mm')"
            class="daily-weather-stats__precip"
        />
        <BasicDailyWeatherStat
            :icon-src="WindSvgUrl"
            :title="t('weatherStats.wind')"
            :value="stats.maxwind_kph"
            :measurement="t('measurements.kmh')"
            class="daily-weather-stats__wind"
        />
        <BasicDailyWeatherStat
            :icon-src="HumiditySvgUrl"
            :title="t('weatherStats.humidity')"
            :value="stats.avghumidity"
            :measurement="'%'"
            class="daily-weather-stats__hum"
        />
        <BasicDailyWeatherStat
            :icon-src="VisibilitySvgUrl"
            :title="t('weatherStats.visibility')"
            :value="stats.avgvis_km"
            :measurement="t('measurements.km')"
            class="daily-weather-stats__vis"
        />
        <BasicDailyWeatherStat
            :icon-src="RainChanceSvgUrl"
            :title="t('weatherStats.rain-chance')"
            :value="stats.daily_chance_of_rain"
            :measurement="'%'"
            class="daily-weather-stats__rain-chance"
        />
        <BasicDailyWeatherStat
            :icon-src="SnowChanceSvgUrl"
            :title="t('weatherStats.snow-chance')"
            :value="stats.daily_chance_of_snow"
            :measurement="'%'"
            class="daily-weather-stats__snow-chance"
        />
    </div>
</template>

<style scoped lang="scss">
.daily-weather-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
}

@media screen and (min-width: 1440px) {
    .daily-weather-stats {
        grid-template-columns: 1fr 1fr 1fr;

        &__percip {
            order: 1;
        }
        &__wind {
            order: 2;
        }
        &__rain-chance {
            order: 3;
        }
        &__hum {
            order: 4;
        }
        &__vis {
            order: 5;
        }
        &__snow-chance {
            order: 6;
        }
    }
}
</style>
