<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import colors from "../assets/colors/colors.json";
import { HourlyWeather } from "../types/requestTypes";
import { useI18n } from "vue-i18n";
import { useMeasurement } from "../composables/useMeasurement";
import { useDraggableScroll } from "../composables/useDraggableScroll";
import { useConditionIcons } from "../composables/useConditionIcons";

const props = defineProps<{
    hourlyForecast: HourlyWeather[];
}>();

const { locale } = useI18n();

const { measurement } = useMeasurement();

const dateFormat = computed(() => {
    return locale.value === "ru" ? "HH:mm" : "h A";
});

const labelHours = computed(() => {
    return props.hourlyForecast.map((item) => {
        const date = new Date(item.time);
        const formatted = useDateFormat(date, dateFormat.value, {
            locales: "en-US",
        });
        return formatted.value;
    });
});

const tempData = computed(() => {
    return props.hourlyForecast.map((item) => {
        return measurement.value === "C" ? item.temp_c : item.temp_f;
    });
});

const data = computed(() => {
    return {
        labels: labelHours.value,
        datasets: [
            {
                label: "ab",
                backgroundColor: colors["accent-300"],
                data: tempData.value,
            },
        ],
    };
});

const container = ref<HTMLElement | null>(null);

const { mouseDownHandler } = useDraggableScroll(container);

const scrollOnWheel = function (e: WheelEvent) {
    if (container.value) {
        container.value.scrollLeft += e.deltaY / 4;
    }
};

const { getIconUrl } = useConditionIcons();
</script>

<template>
    <div
        ref="container"
        class="hourly-forecast-chart"
        @wheel.prevent="scrollOnWheel"
    >
        <div
            class="hourly-forecast-chart__chart-container"
            @mousedown="mouseDownHandler"
        >
            <BasicHourlyChart
                :data="data"
                :point-formatter="
                    (value) => {
                        return value + '°';
                    }
                "
            />
        </div>
        <div class="hourly-forecast-chart__condition-icons">
            <BasicConditionIcon
                v-for="hour in hourlyForecast"
                :key="hour.time"
                v-tooltip="{
                    theme: 'custom-tooltip',
                    content: hour.condition.text,
                }"
                :icon-src="getIconUrl(hour.condition.code)"
                :type="'tiny'"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.hourly-forecast-chart {
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 5px;
    gap: 5px;
    overflow-x: scroll;

    &::-webkit-scrollbar {
        width: 2px;
        height: 2px;

        &-track {
            background-color: transparent;
        }

        &-thumb {
            border-radius: 20px;
            background-color: var(--basic-light-dull);
        }
    }

    &__chart-container {
        // border: 1px solid blue;
        // height: 100%;
        width: 1000px;
        min-width: 1000px;
        cursor: grab;

        &:active {
            cursor: grabbing;
        }
    }

    &__condition-icons {
        width: 1000px;
        min-width: 1000px;
        display: flex;
        justify-content: space-between;
    }
}
</style>
