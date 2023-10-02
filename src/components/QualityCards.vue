<script setup lang="ts">
defineProps<{
    current: any;
    isLoading: boolean;
    isError: boolean;
}>();
</script>

<template>
    <div class="quality-cards">
        <div v-if="isLoading" class="quality-cards__loading">Loading..</div>
        <div v-else-if="current && !isError" class="quality-cards__content">
            <BasicQualityCard
                :value="current.air_quality['gb-defra-index']"
                :max-value="5"
                :evaluation="'Moderate'"
                :title="'Air Quality'"
            />
            <BasicQualityCard
                :value="current.uv"
                :max-value="10"
                :evaluation="'Good'"
                :title="'UV Index'"
            />
        </div>
        <div v-else class="quality-cards__error">Error</div>
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
