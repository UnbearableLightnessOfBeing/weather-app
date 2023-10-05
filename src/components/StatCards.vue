<script setup lang="ts">
import FeelsLikeSvgUrl from "/interface/feels-like.svg";
import CloudCoverSvgUrl from "/interface/cloud-cover.svg";
import VisibilitySvgUrl from "/interface/visibility.svg";
import PressureSvgUrl from "/interface/pressure.svg";
import { useMeasurement } from "../composables/useMeasurement";
import { CurrentWeather } from "../types/requestTypes";

defineProps<{
    current?: CurrentWeather;
}>();

const { measurement } = useMeasurement();
</script>

<template>
    <div class="stat-cards">
        <div class="stat-cards__content">
            <BasicLoader v-if="!current" class="stat-cards__loader" />
            <BasicStatCard
                v-else
                :icon-src="FeelsLikeSvgUrl"
                :title="'feels like'"
                :value="
                    measurement === 'C'
                        ? current.feelslike_c
                        : current.feelslike_f
                "
                :measurement="`°${measurement}`"
            />
            <BasicLoader v-if="!current" class="stat-cards__loader" />
            <BasicStatCard
                v-else
                :icon-src="CloudCoverSvgUrl"
                :title="'cloud coverage'"
                :value="`${current.cloud}`"
                :measurement="'%'"
            />
            <BasicLoader v-if="!current" class="stat-cards__loader" />
            <BasicStatCard
                v-else
                :icon-src="VisibilitySvgUrl"
                :title="'visibility'"
                :value="`${current.vis_km}`"
                :measurement="'km'"
            />
            <BasicLoader v-if="!current" class="stat-cards__loader" />
            <BasicStatCard
                v-else
                :icon-src="PressureSvgUrl"
                :title="'pressure'"
                :value="`${current.pressure_mb}`"
                :measurement="'hPa'"
            />
        </div>
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

    &__loader {
        width: 180px;
        height: 180px;
        border-radius: 15px;
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
