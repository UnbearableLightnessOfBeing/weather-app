<script setup lang="ts"></script>

<template>
    <div class="swiper-loader">
        <BasicLoader class="swiper-loader__title" />
        <div class="swiper-loader__slides">
            <BasicLoader
                v-for="card in 4"
                :key="card"
                class="swiper-loader__slide"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.swiper-loader {
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: center;
    align-content: center;
    padding: 16px;
    padding-top: 0;
    overflow: hidden;

    &__title {
        width: 200px;
        height: 40px;
        align-self: center;
    }

    &__slides {
        display: flex;
        gap: 20px;
        justify-content: space-between;
    }

    &__slide {
        width: 110px;
        min-width: 110px;
        height: 200px;
        min-height: 200px;
    }
}

@media screen and (min-width: 1440px) {
    .swiper-loader {
        width: 762px;
        padding-right: 35px;
        padding-left: 66px;
    }
}
</style>
