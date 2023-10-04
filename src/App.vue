<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getCurrentWeather } from "./api/requests";
import { useI18n } from "vue-i18n";
import ShrugSvgUrl from "/interface/shrug.svg";

const { t, locale } = useI18n();

locale.value = "en";

const location = ref("Bryansk");

const { data, isError } = useQuery({
    queryKey: ["currentWeather", location],
    queryFn: () => getCurrentWeather(location.value),
    refetchOnWindowFocus: false,
    // refetchInterval: 30000,
});

const activeDay = ref<number | null>(null);
</script>
<template>
    <AppLayout class="app-layout">
        <BasicError v-if="isError" :text="t('errors.dataLoadingError')" />
        <AppPanelLayout v-else class="app-layout__left-panel">
            <DailyForecastInfo v-if="activeDay" :active-day="activeDay" />
            <CurrentWeatherInfo
                v-else
                v-model:location="location"
                :current="data?.current"
            />
            <ForecastCardSwiper
                :forecastday="data?.forecast?.forecastday"
                v-model:active-day="activeDay"
            />
        </AppPanelLayout>
        <BasicError
            v-if="isError"
            :icon-src="ShrugSvgUrl"
            :icon-width="150"
            :icon-height="150"
        />
        <AppPanelLayout v-else class="app-layout__right-panel">
            <CurrentWeatherStats
                v-model:location="location"
                :current="data?.current"
            />
        </AppPanelLayout>
    </AppLayout>
</template>

<style scoped lang="scss">
.app-layout {
    &__left-panel {
        & > * + * {
            margin-top: 30px;
        }
    }

    &__error {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        color: var(--error);
        font-size: var(--fs-heading);
        font-weight: var(--fw-normal-thiner);
    }
}

.flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media screen and (min-width: 1440px) {
    .app-layout {
        &__left-panel {
            & > * + * {
                margin: 0;
            }
        }

        &__right-panel {
            background: radial-gradient(
                107.32% 141.42% at 0% 0%,
                rgba(255, 255, 255, 0.5) 0%,
                rgba(255, 255, 255, 0) 100%
            );
            box-shadow: -5px -5px 250px 0px rgba(255, 255, 255, 0.02) inset;
            border-left: 2px solid var(--basic-light-dull);
            backdrop-filter: blur(21px);
        }
    }
}
</style>
