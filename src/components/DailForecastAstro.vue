<script setup lang="ts">
import { AstronomyType } from "../types/requestTypes";
import { useI18n } from "vue-i18n";

defineProps<{
    astro: AstronomyType;
}>();

const { t } = useI18n();
</script>

<template>
    <div class="daily-forecast-astrology">
        <BasicAstroClock :title="t('astro.sunrise')" :time="astro.sunrise" />
        <BasicAstroClock :title="t('astro.sunset')" :time="astro.sunset" />
    </div>
</template>

<style scoped lang="scss">
.daily-forecast-astrology {
    display: flex;
    justify-content: center;
    gap: 60px;
}
</style>
