<script setup lang="ts">
import InlineSvg from "vue-inline-svg";

defineProps<{
    iconSrc: string;
    title: string;
}>();
</script>

<template>
    <div class="basic-stat-title">
        <InlineSvg :src="iconSrc" class="basic-stat-title__icon" />
        <div class="basic-stat-title__title">{{ title }}</div>
    </div>
</template>

<style scoped lang="scss">
.basic-stat-title {
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr;
    gap: 2px;
    color: var(--basic-light-faded);

    &__icon {
        width: 30px;
        height: 30px;
    }

    &__title {
        text-transform: uppercase;
        font-size: var(--fs-small);
        font-weight: var(--fw-bold);
        text-align: center;
    }
}
</style>
