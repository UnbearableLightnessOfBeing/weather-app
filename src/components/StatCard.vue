<script setup lang="ts">
const props = defineProps<{
    iconSrc: string;
    title: string;
    value?: string | number;
    measurement?: string;
    isLoading?: boolean;
}>();

const valueExists = computed<boolean>(() => {
    return typeof props.value !== "undefined";
});
</script>

<template>
    <BasicLoader v-if="isLoading" class="stat-card-filler" />
    <BasicGlassWrapper
        v-else-if="valueExists"
        class="stat-card"
        v-bind="$attrs"
    >
        <BasicStatTitle
            :icon-src="iconSrc"
            :title="title"
            class="stat-card__title"
        />
        <div class="stat-card__value">
            {{ value }}
            <span class="stat-card__measurement">{{ measurement }}</span>
        </div>
    </BasicGlassWrapper>
    <BasicNodata v-else class="stat-card-filler" />
</template>

<style scoped lang="scss">
.stat-card {
    padding: 10px;
    width: 180px;
    height: 180px;
    display: grid;
    grid-template-rows: auto 1fr;

    &__title {
        transition: color 0.2s ease-out;
    }

    &__value {
        align-self: center;
        justify-self: center;
        font-size: var(--fs-large);
        font-weight: var(--fw-normal-thiner);
        transition: transform 0.2s ease-in;
        text-align: center;
        display: flex;
        gap: 5px;
    }

    &__measurement {
        align-self: flex-start;
        font-size: var(--fs-small);
    }

    &:hover {
        .stat-card {
            &__title {
                color: var(--basic-light);
            }

            &__value {
                transform: scale(1.15);
            }
        }
    }

    &-filler {
        width: 180px;
        height: 180px;
        border-radius: 15px;
    }
}
</style>
