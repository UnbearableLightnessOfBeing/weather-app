<script setup lang="ts">
import { AirQuality } from "../types/requestTypes";
import { getUvIndecies } from "../data/uvIndecies";
import { getUsEpaIndecies } from "../data/usEpaIndecies";
import { useI18n } from "vue-i18n";
import { useLocale } from "../composables/useLocale";

const props = defineProps<{
    airQuality?: AirQuality;
    uvIndex?: number;
    isLoading: boolean;
}>();

const { t } = useI18n();

const { locale } = useLocale();

const uvIndecies = computed(() => getUvIndecies(locale.value));
const usEpaIndecies = computed(() => getUsEpaIndecies(locale.value));

const epaIndex = computed((): number | undefined => {
    if (!props.airQuality || !props.airQuality["us-epa-index"])
        return undefined;
    return props.airQuality["us-epa-index"];
});

const evaluation = computed(() => {
    if (!epaIndex.value) return undefined;
    return usEpaIndecies.value[epaIndex.value];
});
</script>

<template>
    <div class="quality-cards">
        <QualityCard
            :value="epaIndex"
            :max-value="6"
            :evaluation="evaluation"
            :title="t('qualityStats.airQuality')"
            :is-loading="isLoading"
        />
        <QualityCard
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

    @media screen and (min-width: 600px) {
        gap: 90px;
        flex-direction: row;
    }
}
</style>
