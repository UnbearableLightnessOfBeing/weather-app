<script setup lang="ts">
defineProps<{
    temperature: string;
    iconSrc: string;
    day: string;
}>();
</script>

<template>
    <div class="basic-forecast-card">
        <div class="basic-forecast-card__temp">
            {{ temperature }}
        </div>
        <div class="basic-forecast-card__icon">
            <BasicConditionIcon :icon-src="iconSrc" type="small" />
        </div>
        <div class="basic-forecast-card__day">{{ day }}</div>
    </div>
</template>

<style scoped lang="scss">
.basic-forecast-card {
    width: 110px;
    height: 200px;
    background-color: rgba(255, 255, 255, 0.2);
    padding-block: 16px;
    display: flex;
    flex-direction: column;
    // backdrop-filter: blur(5px);
    border-radius: 11px;
    overflow: hidden;
    justify-content: space-between;
    border: 1px solid var(--basic-light-dull);
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
        border-color: var(--basic-light);
    }

    &__temp,
    &__day {
        font-size: var(--fs-normal);
        text-align: center;
    }

    &__icon {
        margin-inline: auto;
    }
}
</style>
