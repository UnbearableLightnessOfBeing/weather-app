<script setup lang="ts">
import FeelsLikeSvgUrl from "/interface/feels-like.svg";
import CloudCoverSvgUrl from "/interface/cloud-cover.svg";
import WindGustSvgUrl from "/interface/wind-gust.svg";
import PressureSvgUrl from "/interface/pressure.svg";

defineProps<{
    current: any;
    isLoading: boolean;
    isError: boolean;
}>();
</script>

<template>
    <div class="stat-cards">
        <div v-if="isLoading" class="stat-cards__loading">Loading...</div>
        <div v-else-if="current && !isError" class="stat-cards__content">
            <BasicStatCard
                :icon-src="FeelsLikeSvgUrl"
                :title="'feels like'"
                :value="`${current.feelslike_c}`"
                :measurement="'°C'"
            />
            <BasicStatCard
                :icon-src="CloudCoverSvgUrl"
                :title="'cloud coverage'"
                :value="`${current.cloud}`"
                :measurement="'%'"
            />
            <BasicStatCard
                :icon-src="WindGustSvgUrl"
                :title="'wind gust'"
                :value="`${current.gust_kph}`"
                :measurement="'km/h'"
            />
            <BasicStatCard
                :icon-src="PressureSvgUrl"
                :title="'pressure'"
                :value="`${current.pressure_mb}`"
                :measurement="'hPa'"
            />
        </div>
        <div v-else class="stat-cards__error">error</div>
    </div>
</template>

<style scoped lang="scss">
.stat-cards {
    display: flex;
    justify-content: center;

    &__content {
        width: fit-content;
        display: grid;
        gap: 6px;
        justify-content: center;
        align-items: center;
        justify-items: center;
    }
}

@media screen and (min-width: 400px) {
    .stat-cards {
        &__content {
            grid-template-columns: 1fr 1fr;
        }
    }
}

@media screen and (min-width: 600px) {
    .stat-cards {
        &__content {
            gap: 25px;
        }
    }
}
</style>
