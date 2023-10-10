<script setup lang="ts">
import { HourlyWeather } from "../types/requestTypes";
import { useI18n } from "vue-i18n";

defineProps<{
    hourlyForecast: HourlyWeather[];
}>();

const { t } = useI18n();
</script>

<template>
    <div class="hourly-forecast-data">
        <div class="hourly-forecast-data__heading">
            <div class="hourly-forecast-data__title">
                {{ t("chart.hourly") }}
            </div>
            <div class="hourly-forecast-data__details">
                {{ t("chart.details") }}
            </div>
        </div>
        <HourlyForecastChart :hourly-forecast="hourlyForecast" />
    </div>
</template>

<style scoped lang="scss">
.hourly-forecast-data {
    & > * + * {
        margin-top: 5px;
    }

    &__heading {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    &__title {
        font-size: var(--fs-stats);
    }

    &__details {
        font-size: var(--fs-small);
        cursor: pointer;
        color: var(--basic-light-faded);

        &:hover {
            color: var(--basic-light);
        }
    }
}
</style>
