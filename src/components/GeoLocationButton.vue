<script setup lang="ts">
import LocationSvgUrl from "/interface/geo-location.svg";
import InlineSvg from "vue-inline-svg";
import { useGeolocation } from "@vueuse/core";
import { getCurrentLocation } from "../api/requests";
import { useQuery } from "@tanstack/vue-query";
import { useI18n } from "vue-i18n";

const emits = defineEmits<{
    //eslint-disable-next-line
    (e: "update:location", value: string): void;
}>();

const { t } = useI18n();

const { coords, error } = useGeolocation();

const latitude = computed(() => coords.value.latitude);
const longitude = computed(() => coords.value.longitude);

const { data, refetch, isError } = useQuery({
    queryKey: ["currentLocation"],
    queryFn: () => getCurrentLocation(latitude.value, longitude.value),
    refetchOnWindowFocus: false,
    enabled: false,
});

const emitLocation = () => {
    if (data.value && !isError.value) {
        emits(
            "update:location",
            `${data.value.location.name}, ${data.value.location.country}`,
        );
    }
};

const setLocation = async () => {
    if (
        !error.value &&
        latitude.value !== Infinity &&
        longitude.value !== Infinity
    ) {
        await refetch();
        emitLocation();
    }
};
</script>

<template>
    <div
        v-tooltip="{
            theme: 'custom-tooltip',
            content: t('geoLocation.tooltipMessage'),
        }"
        class="geo-location-button"
        @click="setLocation"
    >
        <InlineSvg :src="LocationSvgUrl" class="geo-location-button__icon" />
    </div>
</template>

<style scoped lang="scss">
.geo-location-button {
    width: 35px;
    min-width: 35px;
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
