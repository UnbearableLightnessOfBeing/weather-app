<script setup lang="ts">
import { useMeasurement } from "../composables/useMeasurement";
import { useI18n } from "vue-i18n";
import type { CurrentWeather, LocationType } from "../types/requestTypes";

const props = defineProps<{
    current?: CurrentWeather;
    location?: LocationType;
    isLoading: boolean;
}>();

const i18n = useI18n();
const locale = computed(() => {
    return i18n.locale.value as "en" | "ru";
});

const { measurement } = useMeasurement();

const unixCurrentDate = ref<Date | null>(null);

const setDate = (diffInHours: number) => {
    unixCurrentDate.value = new Date(
        new Date().getTime() - diffInHours * 60 * 60 * 1000,
    );
};

let interval: number = 0;

const setUnixCurrentDate = () => {
    if (props.location && props.location.localtime) {
        const localTime = new Date(props.location.localtime).getTime();
        const now = new Date().getTime();
        const diffInHours = Math.round((now - localTime) / (1000 * 60 * 60));
        setDate(diffInHours);
        interval = setInterval(() => {
            setDate(diffInHours);
        }, 1000);
    }
};

watch(
    computed(() => props.isLoading),
    () => {
        clearInterval(interval);
        setUnixCurrentDate();
    },
);

onMounted(() => {
    setUnixCurrentDate();
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>

<template>
    <div class="main-info">
        <div class="main-info__content">
            <BasicLoader v-if="isLoading" class="main-info__temp-loader" />
            <BasicTemperature
                v-else-if="current"
                :value="measurement === 'C' ? current.temp_c : current.temp_f"
                :measurement="measurement"
            />
            <BasicNodata v-else class="main-info__temp-no-data" />
            <BasicLoader v-if="isLoading" class="main-info__date-loader" />
            <CurrentDateInfo
                v-else-if="unixCurrentDate"
                :language="locale"
                :unix-date="unixCurrentDate"
            />
            <BasicNodata v-else class="main-info__date-no-data" />
            <BasicLoader v-if="isLoading" class="main-info__stats-loader" />
            <BasicWeatherStats
                v-else-if="current"
                :wind-speed="current.wind_kph"
                :wind-degree="current.wind_degree"
                :humidity="current.humidity"
                :percipitations="current.precip_in"
            />
            <BasicNodata v-else class="main-info__stats-no-data" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-info {
    &__content {
        & > * + * {
            margin-top: 15px;
        }
    }

    &__temp-loader,
    &__temp-no-data {
        width: 165px;
        height: 115px;
    }

    &__date-loader {
        width: 240px;
        height: 87px;
    }

    &__stats-loader,
    &__stats-no-data {
        height: 89px;
    }
}

@media screen and (min-width: 600px) {
    .main-info {
        &__stats-loader,
        &__stats-no-data {
            height: 26px;
        }

        &__temp-loader,
        &__temp-no-data {
            width: 197px;
            height: 197px;
        }

        &__date-loader {
            width: 271px;
            height: 92px;
        }
    }
}
</style>
