<script setup lang="ts">
import { AstronomyType } from "../types/requestTypes";

defineProps<{
    astro: AstronomyType;
}>();
</script>

<template>
    <div class="daily-forecast-astrology">
        <BasicAstrologyClock :title="'Sunrise'" :time="astro.sunrise" />
        <BasicAstrologyClock :title="'Sunset'" :time="astro.sunset" />
    </div>
</template>

<style scoped lang="scss">
.daily-forecast-astrology {
    border: 1px solid blue;
    padding: 10px;
}
</style>
