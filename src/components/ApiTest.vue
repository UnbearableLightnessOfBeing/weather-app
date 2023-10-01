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
import { useConditionIcons } from "../utils/useConditionIcons";

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

const { getIcon } = useConditionIcons();
</script>

<template>
    <div>
        <button @click="toggleDark()">Is dark: {{ isDark }}</button>
        <div style="width: 100%; padding-block: 30px; padding-inline: 10px">
            <ForecastCardSwiper />
        </div>
        <div class="icons">
            <BasicConditionIcon :icon-src="ClearSvgUrl" />
            <BasicConditionIcon :icon-src="ClearNightSvgUrl" />
            <BasicConditionIcon type="big" :icon-src="ClearSvgUrl" />
            <BasicConditionIcon
                v-if="data"
                type="big"
                :icon-src="getIcon(true, data.current.condition.code)"
            />
            <img src="/day/1003-day.png" :width="143" alt="" />
            <img src="/day/1000-day.png" :width="143" alt="" />
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
            <LocationInterface v-model="location" />
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
        <BasicQualityCard
            v-if="data"
            :value="data.current.air_quality['gb-defra-index']"
            :max-value="5"
            :evaluation="'Moderate'"
            :title="'Air Quality'"
        />
        <BasicQualityCard
            v-if="data"
            :value="data.current.uv"
            :max-value="10"
            :evaluation="'Good'"
            :title="'UV Index'"
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
        <pre>
            {{ data }}
        </pre>
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
