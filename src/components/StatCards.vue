<script setup lang="ts">
import FeelsLikeSvgUrl from "/interface/feels-like.svg";
import CloudCoverSvgUrl from "/interface/cloud-cover.svg";
import VisibilitySvgUrl from "/interface/visibility.svg";
import PressureSvgUrl from "/interface/pressure.svg";
import { useMeasurement } from "../composables/useMeasurement";
import { CurrentWeather } from "../types/requestTypes";
import { useI18n } from "vue-i18n";

const props = defineProps<{
    current?: CurrentWeather;
    isLoading: boolean;
}>();

const { measurement } = useMeasurement();

const { t } = useI18n();

type StatCard = {
    title: string;
    value: number | string | undefined;
    measurement: string;
    icon: string;
};

const statCards = computed<StatCard[]>(() => {
    return [
        {
            title: t("weatherStats.feelsLike"),
            value:
                measurement.value === "C"
                    ? props.current?.feelslike_c
                    : props.current?.feelslike_f,
            measurement: `°${measurement.value}`,
            icon: FeelsLikeSvgUrl,
        },
        {
            title: t("weatherStats.cloudCoverage"),
            value: props.current?.cloud,
            measurement: "%",
            icon: CloudCoverSvgUrl,
        },
        {
            title: t("weatherStats.visibility"),
            value: props.current?.vis_km,
            measurement: t("measurements.km"),
            icon: VisibilitySvgUrl,
        },
        {
            title: t("weatherStats.pressure"),
            value: props.current?.pressure_mb,
            measurement: "hPa",
            icon: PressureSvgUrl,
        },
    ];
});
</script>

<template>
    <div class="stat-cards">
        <div class="stat-cards__content">
            <div v-for="card in statCards" :key="card.title">
                <StatCard
                    :icon-src="card.icon"
                    :title="card.title"
                    :value="card.value"
                    :measurement="card.measurement"
                    :is-loading="isLoading"
                />
            </div>
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

    @media screen and (min-width: 400px) {
        &__content {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media screen and (min-width: 600px) {
        &__content {
            gap: 25px;
        }
    }
}
</style>
