<script setup lang="ts">
import WindDirSvgUrl from "/stats/wind-direction.svg";
import HumiditySvgUrl from "/stats/humidity.svg";
import RainSvgUrl from "/stats/rain.svg";

defineProps<{
    windSpeed: number;
    windDegree: number;
    humidity: number;
    percipitations: number;
}>();
</script>

<template>
    <div class="basic-weather-stats">
        <div class="basic-weather-stats__stat">
            <BasicStatIcon
                :icon-src="WindDirSvgUrl"
                class="basic-weather-stats__wind"
                :style="`transform: rotate(${windDegree - 90}deg)`"
            />
            <div>Wind</div>
            <div>{{ windSpeed }} km/h</div>
        </div>
        <BasicVerticalDivider class="basic-weather-stats__divider" />
        <div class="basic-weather-stats__stat">
            <BasicStatIcon :icon-src="HumiditySvgUrl" />
            <div>Hum</div>
            <div>{{ humidity }} %</div>
        </div>
        <BasicVerticalDivider class="basic-weather-stats__divider" />
        <div class="basic-weather-stats__stat">
            <BasicStatIcon :icon-src="RainSvgUrl" />
            <div>Rain</div>
            <div>{{ percipitations }} %</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.basic-weather-stats {
    display: block;

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

        &__divider {
            display: inline-block;
        }
    }
}
</style>
