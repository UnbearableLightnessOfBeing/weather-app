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
            <Transition name="panel" mode="out-in">
                <DailyForecastInfo
                    v-if="typeof activeDay === 'number' && data"
                    :daily-forecast="data?.forecast?.forecastday[activeDay]"
                    :location="location"
                    @unset-active-day="activeDay = null"
                />
                <CurrentWeatherInfo
                    v-else
                    v-model:location="location"
                    :current="data?.current"
                />
            </Transition>
            <MeasurementToggler
                class="app-layout__measurement-toggler"
                :class="{
                    'app-layout__measurement-toggler--daily-view':
                        typeof activeDay === 'number',
                }"
            />
            <ForecastCardSwiper
                v-model:active-day="activeDay"
                :forecastday="data?.forecast?.forecastday"
            />
        </AppPanelLayout>
        <BasicError
            v-if="isError"
            :icon-src="ShrugSvgUrl"
            :icon-width="150"
            :icon-height="150"
        />
        <AppPanelLayout v-else class="app-layout__right-panel">
            <Transition name="panel" mode="out-in">
                <div v-if="typeof activeDay === 'number' && data">aoba</div>
                <CurrentWeatherStats
                    v-else
                    v-model:location="location"
                    :current="data?.current"
                />
            </Transition>
        </AppPanelLayout>
    </AppLayout>
</template>

<style scoped lang="scss">
.app-layout {
    &__left-panel {
        position: relative;

        & > * + * {
            margin-top: 30px;
        }
    }

    &__measurement-toggler {
        position: absolute;
        top: 106px;
        right: 16px;
        left: auto;
        margin-top: 0;
        transition: all 0.6s ease;

        &--daily-view {
            top: 16px;
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

        &__measurement-toggler {
            top: 40px;
            right: 66px;
        }
    }
}

.panel {
    &-enter-active,
    &-leave-active {
        transition: all 0.2s ease;
    }

    &-enter-from {
        opacity: 0;
        transform: scale(0.975) translateY(5px);
    }

    &-leave-to {
        opacity: 0;
        transform: scale(1.025) translateY(-5px);
    }
}
</style>
