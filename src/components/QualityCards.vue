<script setup lang="ts">
import { AirQuality } from "../types/requestTypes";
import { getUvIndecies } from "../data/uvIndecies";
import { getUsEpaIndecies } from "../data/usEpaIndecies";
import { useI18n } from "vue-i18n";

const props = defineProps<{
    airQuality?: AirQuality;
    uvIndex?: number;
}>();

const { t, locale } = useI18n();

const epaIndex = computed(() => {
    if (props.airQuality && props.airQuality["us-epa-index"]) {
        return props.airQuality["us-epa-index"] as number;
    } else return 0;
});

const uvIndecies = computed(() => getUvIndecies(locale.value as "en" | "ru"));
const usEpaIndecies = computed(() =>
    getUsEpaIndecies(locale.value as "en" | "ru"),
);

const evaluation = computed(() => {
    return usEpaIndecies.value[epaIndex.value];
});
</script>

<template>
    <div class="quality-cards">
        <div class="quality-cards__content">
            <BasicLoader v-if="!airQuality" class="quality-cards__loader" />
            <BasicQualityCard
                v-else
                :value="epaIndex"
                :max-value="6"
                :evaluation="evaluation"
                :title="t('qualityStats.airQuality')"
            />
            <BasicLoader v-if="!uvIndex" class="quality-cards__loader" />
            <BasicQualityCard
                v-else
                :value="uvIndex"
                :max-value="10"
                :evaluation="uvIndecies[Math.round(Number(uvIndex))]"
                :title="t('qualityStats.uvIndex')"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.quality-cards {
    display: flex;
    justify-content: center;

    &__content {
        display: grid;
        gap: 50px;
    }

    &__loader {
        width: 167px;
        height: 180px;
    }
}

@media screen and (min-width: 600px) {
    .quality-cards {
        &__content {
            grid-template-columns: 1fr 1fr;
            gap: 90px;
        }
    }
}
</style>
