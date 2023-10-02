<script setup lang="ts">
import "../assets/scss/swiper/swiper.css";
import "../assets/scss/swiper/navigation.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import ClearSvgUrl from "/day/clear.svg";
import { useMeasurement } from "../composables/useMeasurement";

const { measurement } = useMeasurement();
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
        <SwiperSlide v-for="card in 7" :key="card">
            <BasicForecastCard
                :temperature="'24°' + measurement"
                :day="'Mon'"
                :icon-src="ClearSvgUrl"
            />
        </SwiperSlide>
    </Swiper>
</template>

<style scoped lang="scss">
.swiper {
    padding-inline: 16px;
}

@media screen and (min-width: 1440px) {
    .swiper {
        padding-inline: 66px;
        max-width: calc(686px + 76px);
        margin-inline: 0;
    }
}
</style>
