<script setup lang="ts">
defineProps<{
    temperature: string;
    iconSrc: string;
    day: string;
    active?: boolean;
}>();
</script>

<template>
    <BasicGlassWrapper
        class="basic-forecast-card"
        :class="{ 'basic-forecast-card--active': active }"
        :active="active"
    >
        <div class="basic-forecast-card__temp">
            {{ temperature }}
        </div>
        <div class="basic-forecast-card__icon">
            <BasicConditionIcon :icon-src="iconSrc" type="small" />
        </div>
        <div class="basic-forecast-card__day">{{ day }}</div>
    </BasicGlassWrapper>
</template>

<style scoped lang="scss">
.basic-forecast-card {
    width: 110px;
    height: 200px;
    padding-block: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    justify-content: space-between;
    cursor: pointer;

    &__temp,
    &__day {
        font-size: var(--fs-normal);
        text-align: center;
    }

    &__temp {
        font-weight: var(--fw-normal-thiner);
    }

    &__icon {
        margin-inline: auto;
    }

    &--active {
        transform: scale(1.05) translateY(-5px);
        box-shadow: 0px 5px 12px var(--basic-dark-shadow);
    }
}
</style>
