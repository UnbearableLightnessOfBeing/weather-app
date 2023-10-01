<script setup lang="ts">
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import ClearSvgUrl from "/day/clear.svg";
</script>

<template>
    <Swiper
        ref="swiper"
        :slides-per-view="2.5"
        :space-between="20"
        :modules="[Navigation]"
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
                :temperature="'24°C'"
                :day="'Mon'"
                :icon-src="ClearSvgUrl"
            />
        </SwiperSlide>
    </Swiper>
</template>

<style scoped lang="scss"></style>
