<script setup lang="ts">
import { HourlyWeather } from "../types/requestTypes";
import { useI18n } from "vue-i18n";
import type { ChartOption } from "./HourlyForecastChart.vue";
import { Swiper, SwiperSlide } from "swiper/vue";

defineProps<{
    hourlyForecast: HourlyWeather[];
}>();

const { t } = useI18n();

const options = ref<ChartOption[]>([
    {
        name: "temp.",
        measurement: "°C",
    },
    {
        name: "precip.",
        measurement: "mm",
    },
    {
        name: "wind",
        measurement: "km/h",
    },
    {
        name: "pressure",
        measurement: "hPa",
    },
]);

const activeOption = ref(options.value[0]);

const setActiveOption = (value: string) => {
    const foundItem = options.value.find((item) => item.name == value);

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
                {{ t("chart.details") }}
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
                style="width: fit-content"
            >
                <BasicChartOption
                    :name="option.name"
                    :measurement="option.measurement"
                    :active="option.name === activeOption.name"
                    @click="setActiveOption(option.name)"
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
