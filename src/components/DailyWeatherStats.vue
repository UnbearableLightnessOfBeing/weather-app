<script setup lang="ts">
import RainSvgUrl from "/stats/rain.svg";
import WindSvgUrl from "/interface/wind-gust.svg";
import HumiditySvgUrl from "/stats/humidity.svg";
import VisibilitySvgUrl from "/interface/visibility.svg";
import SnowChanceSvgUrl from "/stats/snow-chance.svg";
import RainChanceSvgUrl from "/stats/rain-chance.svg";
import { DailyWeather } from "../types/requestTypes";
import { useI18n } from "vue-i18n";

const props = defineProps<{
    stats?: DailyWeather;
    isLoading: boolean;
}>();

const { t } = useI18n();

type DailyWeatherStat = {
    title: string;
    value: number | undefined;
    measurement: string;
    class: string;
    icon: string;
};

const weatherStats = computed<DailyWeatherStat[]>(() => [
    {
        title: "weatherStats.precipitation",
        value: props.stats?.totalprecip_mm,
        measurement: t("measurements.mm"),
        class: "daily-weather-stats__precip",
        icon: RainSvgUrl,
    },
    {
        title: "weatherStats.wind",
        value: props.stats?.maxwind_kph,
        measurement: t("measurements.kmh"),
        class: "daily-weather-stats__wind",
        icon: WindSvgUrl,
    },
    {
        title: "weatherStats.humidity",
        value: props.stats?.avghumidity,
        measurement: "%",
        class: "daily-weather-stats__hum",
        icon: HumiditySvgUrl,
    },
    {
        title: "weatherStats.visibility",
        value: props.stats?.avgvis_km,
        measurement: t("measurements.km"),
        class: "daily-weather-stats__vis",
        icon: VisibilitySvgUrl,
    },
    {
        title: "weatherStats.rain-chance",
        value: props.stats?.daily_chance_of_rain,
        measurement: "%",
        class: "daily-weather-stats__rain-chance",
        icon: RainChanceSvgUrl,
    },
    {
        title: "weatherStats.snow-chance",
        value: props.stats?.daily_chance_of_snow,
        measurement: "%",
        class: "daily-weather-stats__snow-chance",
        icon: SnowChanceSvgUrl,
    },
]);
</script>

<template>
    <div class="daily-weather-stats">
        <div v-for="stat in weatherStats" :key="stat.class">
            <DailyWeatherStat
                :key="stat.title"
                :stat="{
                    iconSrc: stat.icon,
                    title: stat.title,
                    value: stat.value,
                    measurement: stat.measurement,
                }"
                :class="stat.class"
                :is-loading="isLoading"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.daily-weather-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;

    @media screen and (min-width: 1440px) {
        grid-template-columns: 1fr 1fr 1fr;

        &__precip {
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
