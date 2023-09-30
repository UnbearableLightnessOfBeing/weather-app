<script setup lang="ts">
defineProps<{
    value: number;
    maxValue: number;
    evaluation: string;
    title: string;
}>();
</script>

<template>
    <div class="basic-quality-card">
        <div class="basic-quality-card__title">{{ title }}</div>
        <BasicQualityMonitor
            :value="value"
            :max-value="maxValue"
            :evaluation="evaluation"
        />
    </div>
</template>

<style scoped lang="scss">
.basic-quality-card {
    width: fit-content;
    & > * + * {
        margin-top: 33px;
    }

    &__title {
        font-size: var(--fs-heading);
        font-weight: var(--fw-normal-thiner);
        text-align: center;
    }
}
</style>
