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
        <BasicAstroClock
            :title="t('astro.sunrise')"
            :time="astro?.sunrise"
            :is-loading="isLoading"
        />
        <BasicAstroClock
            :title="t('astro.sunset')"
            :time="astro?.sunset"
            :is-loading="isLoading"
        />
    </div>
</template>

<style scoped lang="scss">
.daily-forecast-astro {
    display: flex;
    justify-content: center;
    gap: 60px;
}
</style>
