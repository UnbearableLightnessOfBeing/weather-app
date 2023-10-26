<script setup lang="ts">
const props = defineProps<{
    value?: number;
    maxValue: number;
    evaluation?: string;
    title: string;
    isLoading?: boolean;
}>();

const valuesExist = computed<boolean>(() => {
    return (
        typeof props.value !== "undefined" &&
        typeof props.evaluation !== "undefined"
    );
});
</script>

<template>
    <BasicLoader v-if="isLoading" class="quality-card-filler" />
    <div v-else-if="valuesExist" class="quality-card" v-bind="$attrs">
        <div class="quality-card__title">{{ title }}</div>
        <QualityMonitor
            :value="value"
            :max-value="maxValue"
            :evaluation="evaluation ?? ''"
            class="quality-card__monitor"
        />
    </div>
    <BasicNodata v-else class="quality-card-filler" />
</template>

<style scoped lang="scss">
.quality-card {
    width: fit-content;
    & > * + * {
        margin-top: 12px;
    }

    &__title {
        font-size: var(--fs-heading);
        font-weight: var(--fw-normal-thiner);
        text-align: center;
        max-height: 34px;
    }

    &__monitor {
        margin-inline: auto;
    }

    &-filler {
        width: 180px;
        height: 167px;
    }

    @media screen and (min-width: 600px) {
        & > * + * {
            margin-top: 33px;
        }
    }
}
</style>
