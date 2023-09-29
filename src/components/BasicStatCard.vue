<script setup lang="ts">
defineProps<{
    iconSrc: string;
    title: string;
    value: string;
    measurement?: string;
}>();
</script>

<template>
    <BasicGlassWrapper class="basic-stat-card">
        <BasicStatTitle
            :icon-src="iconSrc"
            :title="title"
            class="basic-stat-card__title"
        />
        <div class="basic-stat-card__value">
            {{ value }}
            <span class="basic-stat-card__measurement">{{ measurement }}</span>
        </div>
    </BasicGlassWrapper>
</template>

<style scoped lang="scss">
.basic-stat-card {
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
        .basic-stat-card {
            &__title {
                color: var(--basic-light);
            }

            &__value {
                transform: scale(1.15);
            }
        }
    }
}
</style>
