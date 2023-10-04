<script setup lang="ts">
withDefaults(
    defineProps<{
        active?: boolean;
    }>(),
    {
        active: false,
    },
);
</script>

<template>
    <div
        class="basic-glass-wrapper"
        :class="{ 'basic-glass-wrapper--active': active }"
    >
        <slot />
    </div>
</template>

<style scoped lang="scss">
.basic-glass-wrapper {
    width: fit-content;
    height: fit-content;
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid var(--basic-light-dull);
    border-radius: 11px;
    transition: all 0.2s ease;
    box-shadow: -2px 2px 10px var(--basic-dark-dull);

    &:hover,
    &--active {
        border-color: var(--basic-light);
    }
}
</style>
