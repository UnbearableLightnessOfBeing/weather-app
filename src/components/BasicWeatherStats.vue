<script setup lang="ts">
import WindDirSvgUrl from "/stats/wind-direction.svg";
import HumiditySvgUrl from "/stats/humidity.svg";
import RainSvgUrl from "/stats/rain.svg";
import { useI18n } from "vue-i18n";

defineProps<{
    windSpeed: number;
    windDegree: number;
    humidity: number;
    percipitations: number;
}>();

const { t } = useI18n();
</script>

<template>
    <div class="basic-weather-stats">
        <div class="basic-weather-stats__stat">
            <BasicStatIcon
                :icon-src="WindDirSvgUrl"
                class="basic-weather-stats__wind"
                :style="`transform: rotate(${windDegree - 90}deg)`"
            />
            <div>{{ t("weatherStats.wind") }}</div>
            <div>{{ windSpeed }} {{ t("measurements.kmh") }}</div>
        </div>
        <BasicVerticalDivider class="basic-weather-stats__divider" />
        <div class="basic-weather-stats__stat">
            <BasicStatIcon :icon-src="HumiditySvgUrl" />
            <div>{{ t("weatherStats.humidity") }}</div>
            <div>{{ humidity }} %</div>
        </div>
        <BasicVerticalDivider class="basic-weather-stats__divider" />
        <div class="basic-weather-stats__stat">
            <BasicStatIcon :icon-src="RainSvgUrl" />
            <div>{{ t("weatherStats.precipitation") }}</div>
            <div>{{ percipitations }} {{ t("measurements.mm") }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.basic-weather-stats {
    display: block;

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

        &__divider {
            display: inline-block;
        }
    }
}
</style>
