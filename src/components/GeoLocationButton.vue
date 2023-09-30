<script setup lang="ts">
import LocationSvgUrl from "/interface/geo-location.svg";
import InlineSvg from "vue-inline-svg";
import { useGeolocation } from "@vueuse/core";

const { coords, error } = useGeolocation();

const showCoords = () => {
    console.log("coords: ", coords.value);
    console.log("error: ", error.value);
};
</script>

<template>
    <div
        v-tooltip="{
            theme: 'custom-tooltip',
            content: 'Set current location',
        }"
        class="geo-location-button"
        @click="showCoords"
    >
        <InlineSvg :src="LocationSvgUrl" class="geo-location-button__icon" />
    </div>
</template>

<style scoped lang="scss">
.geo-location-button {
    width: 35px;
    height: 35px;
    cursor: pointer;
    position: relative;

    &__icon {
        width: 100%;
        height: 100%;
        transition: all 0.2s ease-out;
    }

    &::after {
        content: "";
        width: 100%;
        height: 5px;
        position: absolute;
        filter: blur(5px);
        bottom: 0;
        left: 0;
        z-index: -1;
        transition: all 0.2s ease;
        background-color: rgba(0, 0, 0, 0);
    }

    &:hover {
        .geo-location-button {
            &__icon {
                transform: translateY(-6px);
                animation-name: float;
                animation-delay: 1s;
                animation-duration: 4s;
                animation-iteration-count: infinite;
            }
        }

        &::after {
            background-color: rgba(0, 0, 0, 0.6);
        }
    }
}

@keyframes float {
    0% {
        transform: translateY(-6px);
    }
    50% {
        transform: translateY(-4px);
    }
    100% {
        transform: translateY(-6px);
    }
}
</style>
