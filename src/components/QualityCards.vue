<script setup lang="ts">
const props = defineProps<{
    current: any;
    isLoading: boolean;
    isError: boolean;
}>();

const usEpaIndecies: Record<number, string> = {
    1: "Good",
    2: "Moderate",
    3: "Unhealthy",
    4: "Unhealthy",
    5: "Very Unhealthy",
    6: "Hazardous",
};

const epaIndex = computed(
    () => props.current.air_quality["us-epa-index"] as number,
);

const evaluation = computed(() => {
    return usEpaIndecies[epaIndex.value];
});

const uvIndecies: Record<number, string> = {
    1: "Low",
    2: "Low",
    3: "Moderate",
    4: "Moderate",
    5: "Moderate",
    6: "High",
    7: "High",
    8: "Very high",
    9: "Very high",
    10: "Very high",
};
</script>

<template>
    <div class="quality-cards">
        <div v-if="isError" class="quality-cards__error">Error</div>
        <div v-else class="quality-cards__content">
            <BasicLoader v-if="isLoading" class="quality-cards__loader" />
            <BasicQualityCard
                v-else
                :value="epaIndex"
                :max-value="6"
                :evaluation="evaluation"
                :title="'Air Quality'"
            />
            <BasicLoader v-if="isLoading" class="quality-cards__loader" />
            <BasicQualityCard
                v-else
                :value="current.uv"
                :max-value="10"
                :evaluation="uvIndecies[Math.round(Number(current.uv))]"
                :title="'UV Index'"
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
