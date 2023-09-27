<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getCurrentWeather } from "../api/requests";
import ClearSvgUrl from "/day/clear.svg";
import ClearNightSvgUrl from "/night/clear.svg";
const location = ref("Bryansk");
const { data } = useQuery({
    queryKey: ["currentWeather", location],
    queryFn: () => getCurrentWeather(location.value),
    refetchInterval: 30000,
});
</script>

<template>
    <div>
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
.icons {
}
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
