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

defineProps<{
    forecastday?: DailyForecast[];
}>();

const { getIconUrl } = useConditionIcons();

const { measurement } = useMeasurement();

const { locale } = useI18n();

const dayRange = computed(() => {
    if (locale.value === "ru") {
        return dayNames.ru.short;
    } else return dayNames.en.short;
});

const getDayName = (dayNum: number): string => {
    return dayRange.value[dayNum];
};

const getTemperature = (temp: number): string => {
    return temp + "°" + measurement.value;
};
</script>

<template>
    <Swiper
        :slides-per-view="2.5"
        :space-between="20"
        :modules="[Navigation]"
        :navigation="true"
        :class="'swiper'"
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
        <SwiperSlide v-for="(card, idx) in forecastday" :key="idx">
            <BasicForecastCard
                :temperature="
                    measurement === 'C'
                        ? getTemperature(card.day.avgtemp_c)
                        : getTemperature(card.day.avgtemp_f)
                "
                :day="getDayName(new Date(card.date).getDay())"
                :icon-src="getIconUrl(card.day.condition.code)"
            />
        </SwiperSlide>
    </Swiper>
</template>

<style scoped lang="scss">
.swiper {
    padding-inline: 16px;

    &__loader {
        width: 110px;
        height: 200px;
    }
}

@media screen and (min-width: 1440px) {
    .swiper {
        padding-inline: 66px;
        max-width: calc(686px + 76px);
        margin-inline: 0;
    }
}
</style>
