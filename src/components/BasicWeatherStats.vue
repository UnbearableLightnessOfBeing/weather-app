<script setup lang="ts">
import WindDirSvgUrl from "/stats/wind-direction.svg";
import HumiditySvgUrl from "/stats/humidity.svg";
import RainSvgUrl from "/stats/rain.svg";

defineProps<{
    windSpeed: number;
    humidity: number;
    percipitations: number;
}>();
</script>

<template>
    <div class="basic-weather-stats">
        <div class="basic-weather-stats__stat">
            <BasicStatIcon :icon-src="WindDirSvgUrl" />
            <div>Wind</div>
            <div>{{ windSpeed }} km/h</div>
        </div>
        <BasicVerticalDivider />
        <div class="basic-weather-stats__stat">
            <BasicStatIcon :icon-src="HumiditySvgUrl" />
            <div>Hum</div>
            <div>{{ humidity }} %</div>
        </div>
        <div class="basic-weather-stats__stat">
            <BasicStatIcon :icon-src="RainSvgUrl" />
            <div>Rain</div>
            <div>{{ percipitations }} %</div>
        </div>
    </div>
</template>

<style scoped></style>
