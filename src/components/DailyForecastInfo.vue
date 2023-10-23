<script setup lang="ts">
import type { DailyForecast } from "../types/requestTypes";
import InlineSvg from "vue-inline-svg";
import ArrowBackSvgUrl from "/interface/arrow-back.svg";
import { useMeasurement } from "../composables/useMeasurement";
import { useLocale } from "../composables/useLocale";

const props = defineProps<{
    dailyForecast?: DailyForecast;
    location: string;
    isLoading: boolean;
}>();

defineEmits<{
    /* eslint-disable */
    (e: "unsetActiveDay"): void;
    /* eslint-enable */
}>();

const { measurement } = useMeasurement();

const { locale } = useLocale();

const computedUnixDate = computed(() => {
    if (props.dailyForecast) {
        return new Date(props.dailyForecast.date);
    } else return undefined;
});
</script>

<template>
    <div class="daily-forecast-info">
        <InlineSvg
            :src="ArrowBackSvgUrl"
            class="daily-forecast-info__back-button"
            @click="$emit('unsetActiveDay')"
        />
        <div class="daily-forecast-info__container">
            <CurrentDateInfo
                :language="locale"
                :unix-date="computedUnixDate"
                time-hidden
                :is-loading="isLoading"
            />
            <div class="daily-forecast-info__location-name">
                {{ location }}
            </div>
        </div>
        <div class="daily-forecast-info__container">
            <WeatherCondition
                :condition="dailyForecast?.day.condition"
                :is-loading="isLoading"
            />
            <BasicDailyTemperature
                :min-value="
                    measurement === 'C'
                        ? dailyForecast?.day.mintemp_c
                        : dailyForecast?.day.mintemp_f
                "
                :max-value="
                    measurement === 'C'
                        ? dailyForecast?.day.maxtemp_c
                        : dailyForecast?.day.maxtemp_f
                "
                :measurement="measurement"
                :is-loading="isLoading"
                class="daily-forecast-info__temp"
            />
        </div>
        <DailyWeatherStats
            :stats="dailyForecast?.day"
            :is-loading="isLoading"
        />
    </div>
</template>

<style scoped lang="scss">
.daily-forecast-info {
    padding: 16px;

    & > * + * {
        margin-top: 20px;
    }

    &__current-info-loader,
    &__no-current-info {
        width: 175px;
        height: 92px;
    }

    &__back-button {
        width: 40px;
        min-width: 40px;
        height: 40px;
        min-height: 40px;
        opacity: 0.7;
        cursor: pointer;

        &:hover,
        &:active {
            opacity: 1;
        }

        &:active {
            transform: scale(1.1);
        }
    }

    &__container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    &__location-name {
        font-size: var(--fs-normal);
        font-weight: var(--fw-normal-thiner);
    }
}

@media screen and (min-width: 1440px) {
    .daily-forecast-info {
        height: 545px;
        padding-inline: 66px;
        padding-block: 40px;

        &__container {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        &__temp {
            min-width: 300px;
        }

        &__location-name {
            font-size: var(--fs-heading);
            text-align: center;
        }
    }
}
</style>
