<script setup lang="ts">
import { AstronomyType } from "../types/requestTypes";
import { useI18n } from "vue-i18n";

defineProps<{
    astro?: AstronomyType;
    isLoading: boolean;
}>();

const { t } = useI18n();
</script>

<template>
    <div class="daily-forecast-astro">
        <BasicLoader v-if="isLoading" class="daily-forecast-astro__loader" />
        <BasicAstroClock
            v-else-if="astro"
            :title="t('astro.sunrise')"
            :time="astro.sunrise"
        />
        <BasicNodata v-else class="daily-forecast-astro__no-data" />
        <BasicLoader v-if="isLoading" class="daily-forecast-astro__loader" />
        <BasicAstroClock
            v-else-if="astro"
            :title="t('astro.sunset')"
            :time="astro.sunset"
        />
        <BasicNodata v-else class="daily-forecast-astro__no-data" />
    </div>
</template>

<style scoped lang="scss">
.daily-forecast-astro {
    display: flex;
    justify-content: center;
    gap: 60px;

    &__loader,
    &__no-data {
        width: 124px;
        height: 230px;
    }
}
</style>
