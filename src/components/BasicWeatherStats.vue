<script setup lang="ts">
import WindDirSvgUrl from "/stats/wind-direction.svg";
import HumiditySvgUrl from "/stats/humidity.svg";
import RainSvgUrl from "/stats/rain.svg";
import { useI18n } from "vue-i18n";

type Stats = {
    windSpeed: number;
    windDegree: number;
    humidity: number;
    percipitations: number;
};

defineProps<{
    stats?: Stats;
    isLoading?: boolean;
}>();

const { t } = useI18n();
</script>

<template>
    <BasicLoader v-if="isLoading" class="basic-weather-stats-filler" />
    <div v-else-if="stats" class="basic-weather-stats">
        <div class="basic-weather-stats__stat">
            <BasicStatIcon
                :icon-src="WindDirSvgUrl"
                class="basic-weather-stats__wind"
                :style="`transform: rotate(${stats.windDegree - 90}deg)`"
            />
            <div>{{ t("weatherStats.wind") }}</div>
            <div>{{ stats.windSpeed }} {{ t("measurements.kmh") }}</div>
        </div>
        <BasicVerticalDivider class="basic-weather-stats__divider" />
        <div class="basic-weather-stats__stat">
            <BasicStatIcon :icon-src="HumiditySvgUrl" />
            <div>{{ t("weatherStats.humidity") }}</div>
            <div>{{ stats.humidity }} %</div>
        </div>
        <BasicVerticalDivider class="basic-weather-stats__divider" />
        <div class="basic-weather-stats__stat">
            <BasicStatIcon :icon-src="RainSvgUrl" />
            <div>{{ t("weatherStats.precipitation") }}</div>
            <div>{{ stats.percipitations }} {{ t("measurements.mm") }}</div>
        </div>
    </div>
    <BasicNodata v-else class="basic-weather-stats-filler" />
</template>

<style scoped lang="scss">
.basic-weather-stats {
    display: block;

    &-filler {
        height: 89px;
    }

    & > * + * {
        margin-top: 5px;
    }

    &__stat {
        display: flex;
        align-items: center;
        gap: 11px;
        color: var(--basic-light);

        & * {
            font-size: var(--fs-stats);
            font-weight: var(--fw-normal-thiner);
        }
    }

    &__divider {
        display: none;
    }

    &__wind {
        transition: all 0.5s ease;
    }
}

@media screen and (min-width: 600px) {
    .basic-weather-stats {
        display: flex;
        gap: 25px;
        align-items: center;
        width: 100%;
        & > * + * {
            margin: 0;
        }

        &-filler {
            height: 26px;
        }

        &__divider {
            display: inline-block;
        }
    }
}
</style>
