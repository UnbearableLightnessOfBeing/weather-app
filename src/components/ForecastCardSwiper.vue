<script setup lang="ts">
import "../assets/scss/swiper/swiper.css";
import "../assets/scss/swiper/navigation.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import { useMeasurement } from "../composables/useMeasurement";
import { useConditionIcons } from "../composables/useConditionIcons";
import type { DailyForecast } from "../types/requestTypes";
import dayNames from "../assets/date/dayNames.json";
import { useI18n } from "vue-i18n";
import { useLocale } from "../composables/useLocale";
import { forecastParams } from "../api/requests";

const props = defineProps<{
    forecastday?: DailyForecast[];
    activeDay: number | null;
    isLoading?: boolean;
}>();

defineEmits<{
    /* eslint-disable */
    (e: "update:activeDay", value: number): void;
    /* eslint-enable */
}>();

const { getIconUrl } = useConditionIcons();

const { measurement } = useMeasurement();

const { t } = useI18n();
const { locale } = useLocale();

const dayRange = computed(() => {
    return dayNames[locale.value].short ?? dayNames.en.short;
});

const getDayName = (dayNum: number): string => {
    return dayRange.value[dayNum];
};

const getTemperature = (temp: number): string => {
    return Math.round(temp) + "°" + measurement.value;
};

const missingAmount = computed(() => {
    if (props.forecastday) {
        const cardAmount = props.forecastday.length;
        return forecastParams.days - cardAmount;
    } else return forecastParams.days;
});
</script>

<template>
    <Swiper
        :slides-per-view="2.5"
        :space-between="20"
        :modules="[Navigation]"
        :navigation="true"
        :class="'forecast-card-swiper'"
        :breakpoints="{
            620: {
                slidesPerView: 4,
                spaceBetween: 50,
            },
            475: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }"
    >
        <template #container-start>
            <BasicLoader
                v-if="isLoading"
                class="forecast-card-swiper__title-loader"
            />
            <span v-else class="forecast-card-swiper__title">
                {{ t("swiperTitle") }}
            </span>
        </template>
        <template #default>
            <SwiperSlide v-for="(card, idx) in forecastday" :key="card.date">
                <BasicForecastCard
                    :temperature="
                        measurement === 'C'
                            ? getTemperature(card.day.avgtemp_c)
                            : getTemperature(card.day.avgtemp_f)
                    "
                    :day="getDayName(new Date(card.date).getDay())"
                    :icon-src="getIconUrl(card.day.condition.code)"
                    :active="activeDay === idx"
                    @click="$emit('update:activeDay', idx)"
                />
            </SwiperSlide>
            <SwiperSlide v-for="card in missingAmount" :key="card">
                <BasicLoader
                    v-if="isLoading"
                    class="forecast-card-swiper__card-filler"
                />
                <BasicNodata v-else class="forecast-card-swiper__card-filler" />
            </SwiperSlide>
        </template>
    </Swiper>
</template>

<style scoped lang="scss">
.forecast-card-swiper {
    padding: 16px;
    padding-top: 0;

    &__loader {
        width: 110px;
        height: 200px;
    }

    &__title {
        display: block;
        padding-bottom: 12px;
        font-size: var(--fs-normal);
        font-weight: var(--fw-normal-thiner);
        width: 100%;
        text-align: center;
    }

    &__title-loader {
        width: 200px;
        height: 30px;
        margin-bottom: 12px;
        margin-inline: auto;
    }

    &__card-filler {
        width: 110px;
        height: 200px;
        display: flex;
        flex-direction: column;
    }

    @media screen and (min-width: 1440px) {
        padding-right: 35px;
        padding-left: 66px;
        max-width: calc(686px + 76px);
        margin-inline: 0;
    }
}
</style>
