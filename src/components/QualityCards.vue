<script setup lang="ts">
import { AirQuality } from "../types/requestTypes";
import { getUvIndecies } from "../data/uvIndecies";
import { getUsEpaIndecies } from "../data/usEpaIndecies";
import { useI18n } from "vue-i18n";

const props = defineProps<{
    airQuality?: AirQuality;
    uvIndex?: number;
    isLoading: boolean;
}>();

const { t, locale } = useI18n();

const epaIndex = computed((): number | undefined => {
    if (props.airQuality && props.airQuality["us-epa-index"]) {
        return props.airQuality["us-epa-index"];
    } else return undefined;
});

const uvIndecies = computed(() => getUvIndecies(locale.value as "en" | "ru"));
const usEpaIndecies = computed(() =>
    getUsEpaIndecies(locale.value as "en" | "ru"),
);

const evaluation = computed(() => {
    if (epaIndex.value) {
        return usEpaIndecies.value[epaIndex.value];
    } else return undefined;
});
</script>

<template>
    <div class="quality-cards">
        <BasicQualityCard
            :value="epaIndex"
            :max-value="6"
            :evaluation="evaluation"
            :title="t('qualityStats.airQuality')"
            :is-loading="isLoading"
        />
        <BasicQualityCard
            :value="uvIndex"
            :max-value="10"
            :evaluation="uvIndecies[Math.round(Number(uvIndex))]"
            :title="t('qualityStats.uvIndex')"
            :is-loading="isLoading"
        />
    </div>
</template>

<style scoped lang="scss">
.quality-cards {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
}

@media screen and (min-width: 600px) {
    .quality-cards {
        gap: 90px;
        flex-direction: row;
    }
}
</style>
