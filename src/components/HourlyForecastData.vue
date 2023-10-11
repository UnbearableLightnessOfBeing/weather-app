<script setup lang="ts">
import { HourlyWeather } from "../types/requestTypes";
import { useI18n } from "vue-i18n";
import type { ChartOption } from "./HourlyForecastChart.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useMeasurement } from "../composables/useMeasurement";
import InlineSvg from "vue-inline-svg";
import IconSvgUrl from "/interface/details.svg";

defineProps<{
    hourlyForecast: HourlyWeather[];
}>();

const { t, locale } = useI18n();

const { measurement } = useMeasurement();

const options = computed<ChartOption[]>(() => {
    return [
        {
            id: 1,
            name: locale.value === "ru" ? "температура" : "temp.",
            measurement: measurement.value === "C" ? "°C" : "°F",
        },
        {
            id: 2,
            name: locale.value === "ru" ? "осадки" : "precip.",
            measurement: t("measurements.mm"),
        },
        {
            id: 3,
            name: locale.value === "ru" ? "ветер" : "wind",
            measurement: t("measurements.kmh"),
        },
        {
            id: 4,
            name: locale.value === "ru" ? "давление" : "pressure",
            measurement: "hPa",
        },
    ];
});

const activeOption = ref(options.value[0]);

const setActiveOption = (value: number) => {
    const foundItem = options.value.find((item) => item.id == value);

    if (foundItem) {
        activeOption.value = foundItem;
    }
};
</script>

<template>
    <div class="hourly-forecast-data">
        <div class="hourly-forecast-data__heading">
            <div class="hourly-forecast-data__title">
                {{ t("chart.hourly") }}
            </div>
            <div class="hourly-forecast-data__details">
                <InlineSvg :src="IconSvgUrl" width="20" height="20" />
                <div>
                    {{ t("chart.details") }}
                </div>
            </div>
        </div>
        <HourlyForecastChart
            :hourly-forecast="hourlyForecast"
            :active-option="activeOption"
        />
        <Swiper
            class="hourly-forecast-data__options"
            :space-between="5"
            :slides-per-view="'auto'"
        >
            <SwiperSlide
                v-for="(option, idx) in options"
                :key="idx"
                class="hourly-forecast-data__option"
            >
                <BasicChartOption
                    :name="option.name"
                    :measurement="option.measurement"
                    :active="option.name === activeOption.name"
                    @click="setActiveOption(option.id)"
                />
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<style scoped lang="scss">
.hourly-forecast-data {
    & > * + * {
        margin-top: 5px;
    }

    &__heading {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    &__title {
        font-size: var(--fs-stats);
    }

    &__details {
        display: flex;
        gap: 2px;
        align-items: center;
        font-size: var(--fs-small);
        cursor: pointer;
        color: var(--basic-light-faded);

        &:hover {
            color: var(--basic-light);
        }
    }

    &__options {
        padding-block: 2px;
        margin-left: -16px;
        width: 100vw;
        padding-inline: 16px;
    }

    &__option {
        width: fit-content;
    }
}

@media screen and (min-width: 600px) {
    .hourly-forecast-data {
        &__options {
            width: 100%;
            margin-left: 0;
            padding-inline: 0px;
        }
    }
}
</style>
