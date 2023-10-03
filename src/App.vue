<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getCurrentWeather } from "./api/requests";
import { useBreakpoints } from "@vueuse/core";

const breakPoints = useBreakpoints({
    desktop: 1400,
});

const isDesktop = breakPoints.greaterOrEqual("desktop");

const location = ref("Bryansk");

const { data, isLoading, isError } = useQuery({
    queryKey: ["currentWeather", location],
    queryFn: () => getCurrentWeather(location.value),
    refetchOnWindowFocus: false,
    // refetchInterval: 30000,
});
</script>
<template>
    <!-- <ApiTest /> -->
    <div class="app-layout">
        <div class="app-layout__wrapper">
            <div class="app-layout__left">
                <div class="info-block">
                    <LocationInterface v-if="!isDesktop" v-model="location" />
                    <div class="flex-between">
                        <WeatherCondition
                            :condition="
                                data ? data.current.condition : undefined
                            "
                        />
                        <MeasurementToggler />
                    </div>
                    <MainInfo :current="data ? data.current : undefined" />
                </div>
                <ForecastCardSwiper />
            </div>
            <div class="info-block app-layout__right">
                <LocationInterface v-if="isDesktop" v-model="location" />
                <StatCards :current="data ? data.current : undefined" />
                <BasicHorizontalDivider />
                <QualityCards :current="data ? data.current : undefined" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.app-layout {
    &__wrapper {
        background: var(--bg-light);
        padding-block: 25px;

        & > * + * {
            margin-top: 30px;
        }
    }

    &__left,
    &__right {
        max-width: 864px;
        margin-inline: auto;

        & > * + * {
            margin-top: 30px;
        }
    }

    &__main-info {
        & > * + * {
            margin-top: 25px;
        }
    }
}

.info-block {
    padding: 16px;

    & > * + * {
        margin-top: 25px;
    }
}

.flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media screen and (min-width: 1440px) {
    .app-layout {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        &__wrapper {
            display: grid;
            grid-template-columns: 864px 576px;
            justify-content: center;
            align-content: center;
            padding: 0;
            height: 815px;
            border-radius: 20px;
            overflow: hidden;

            & > * + * {
                margin-top: 0;
            }
        }

        &__left,
        &__right {
            margin-inline: 0;
            height: 815px;
        }

        &__left {
            padding-bottom: 40px;
        }

        &__right {
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

    .info-block {
        padding-inline: 66px;
        padding-top: 40px;
    }
}
</style>
