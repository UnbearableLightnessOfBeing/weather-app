<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getCurrentWeather } from "../api/requests";
import ClearSvgUrl from "/day/clear.svg";
import ClearNightSvgUrl from "/night/clear.svg";
import FeelsLikeSvgUrl from "/interface/feels-like.svg";
import CloudCoverSvgUrl from "/interface/cloud-cover.svg";
import WindGustSvgUrl from "/interface/wind-gust.svg";
import PressureSvgUrl from "/interface/pressure.svg";
import { useDark, useToggle } from "@vueuse/core";

const location = ref("Bryansk");

const { data } = useQuery({
    queryKey: ["currentWeather", location],
    queryFn: () => getCurrentWeather(location.value),
    refetchOnWindowFocus: false,
    // refetchInterval: 30000,
});

const unixDate = ref(new Date());

let interval: number = 0;

onMounted(() => {
    interval = setInterval(() => {
        unixDate.value = new Date();
    }, 1000);
});

onUnmounted(() => {
    clearInterval(interval);
});

const isDark = useDark();
const toggleDark = useToggle(isDark);

const measurement = ref<"F" | "C">("C");
</script>

<template>
    <div>
        <button @click="toggleDark()">Is dark: {{ isDark }}</button>
        <div class="icons">
            <BasicConditionIcon :icon-src="ClearSvgUrl" />
            <BasicConditionIcon :icon-src="ClearNightSvgUrl" />
            <BasicConditionIcon type="big" :icon-src="ClearSvgUrl" />
            <BasicConditionIcon type="big" :icon-src="ClearNightSvgUrl" />
        </div>
        <BasicForecastCard
            :temperature="'24°C'"
            :day="'Mon'"
            :icon-src="ClearSvgUrl"
        />
        <BasicTemperature
            v-if="data"
            :value="data.current.temp_c"
            :mesurement="'C'"
        />
        <CurrentDateInfo :language="'en'" :unix-date="unixDate" />
        <BasicWeatherStats
            v-if="data"
            :wind-speed="data.current.wind_kph"
            :wind-degree="data.current.wind_degree"
            :humidity="data.current.humidity"
            :percipitations="data.current.precip_in"
        />
        <MeasurementToggler v-model="measurement" />
        <div style="max-width: 450px">
            <LocationInterface />
        </div>
        <BasicStatCard
            v-if="data"
            :icon-src="FeelsLikeSvgUrl"
            :title="'feels like'"
            :value="`${data.current.feelslike_c}`"
            :measurement="'°C'"
        />
        <BasicStatCard
            v-if="data"
            :icon-src="CloudCoverSvgUrl"
            :title="'cloud coverage'"
            :value="`${data.current.cloud}`"
            :measurement="'%'"
        />
        <BasicStatCard
            v-if="data"
            :icon-src="WindGustSvgUrl"
            :title="'wind gust'"
            :value="`${data.current.gust_kph}`"
            :measurement="'km/h'"
        />
        <BasicStatCard
            v-if="data"
            :icon-src="PressureSvgUrl"
            :title="'pressure'"
            :value="`${data.current.pressure_mb}`"
            :measurement="'hPa'"
        />
        <BasicQualityMonitor
            v-if="data"
            :value="data.current.air_quality['gb-defra-index']"
            :max-value="5"
            :evaluation="'Moderate'"
        />
        <BasicQualityMonitor
            v-if="data"
            :value="data.current.uv"
            :max-value="10"
            :evaluation="'Good'"
        />
        <div class="cities">
            <div class="cities__city" @click="location = 'Bryansk'">
                Bryansk
            </div>
            <div class="cities__city" @click="location = 'Moscow'">Moscow</div>
            <div class="cities__city" @click="location = 'New York'">
                New York
            </div>
        </div>
        <!-- <pre>
        {{ data }}
        </pre> -->
    </div>
</template>

<style scoped lang="scss">
.cities {
    display: flex;
    gap: 20px;

    &__city {
        border: 1px solid pink;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;

        &:hover {
            background-color: pink;
        }
    }
}
</style>
