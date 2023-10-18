<script setup lang="ts">
withDefaults(
    defineProps<{
        active?: boolean;
        floats?: boolean;
        colored?: boolean;
    }>(),
    {
        active: false,
        floats: false,
        colored: false,
    },
);
</script>

<template>
    <div
        class="basic-glass-wrapper"
        :class="[
            { 'basic-glass-wrapper--active': active },
            { 'basic-glass-wrapper--floats': floats },
            { 'basic-glass-wrapper--colored': colored },
        ]"
    >
        <slot />
    </div>
</template>

<style scoped lang="scss">
.basic-glass-wrapper {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid var(--basic-light-dull);
    border-radius: 11px;
    transition: all 0.2s ease;
    box-shadow: -2px 2px 10px var(--basic-dark-dull);

    &:hover,
    &--active {
        border-color: var(--basic-light);
    }

    &--colored {
        background-color: var(--accent-200);
    }

    &--floats {
        transform: scale(1.05) translateY(-5px);
        box-shadow: 0px 5px 12px var(--basic-dark-shadow);
    }
}
</style>
