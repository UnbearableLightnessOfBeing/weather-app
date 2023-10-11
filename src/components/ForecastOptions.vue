<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { ChartOption } from "./HourlyForecastChart.vue";

defineProps<{
    options: ChartOption[];
    activeOption: ChartOption;
}>();

defineEmits<{
    //eslint-disable-next-line
    (e: "update:activeOption", value: ChartOption): void;
}>();
</script>

<template>
    <Swiper
        class="forecast-options"
        :space-between="5"
        :slides-per-view="'auto'"
    >
        <SwiperSlide
            v-for="(option, idx) in options"
            :key="idx"
            class="forecast-options__option"
        >
            <BasicChartOption
                :name="option.name"
                :measurement="option.measurement"
                :active="option.id === activeOption.id"
                @click="$emit('update:activeOption', option)"
            />
        </SwiperSlide>
    </Swiper>
</template>

<style scoped lang="scss">
.forecast-options {
    padding-block: 2px;
    margin-left: -16px;
    width: 100vw;
    padding-inline: 16px;

    &__option {
        width: fit-content;
    }
}

@media screen and (min-width: 600px) {
    .forecast-options {
        width: 100%;
        margin-left: 0;
        padding-inline: 0px;
    }
}
</style>
