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
    <BasicLoader v-if="isLoading" class="basic-quality-card-filler" />
    <div v-else-if="valuesExist" class="basic-quality-card" v-bind="$attrs">
        <div class="basic-quality-card__title">{{ title }}</div>
        <BasicQualityMonitor
            :value="value ?? 0"
            :max-value="maxValue"
            :evaluation="evaluation ?? ''"
            class="basic-quality-card__monitor"
        />
    </div>
    <BasicNodata v-else class="basic-quality-card-filler" />
</template>

<style scoped lang="scss">
.basic-quality-card {
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
}

@media screen and (min-width: 600px) {
    .basic-quality-card {
        & > * + * {
            margin-top: 33px;
        }
    }
}
</style>
