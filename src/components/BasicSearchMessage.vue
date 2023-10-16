<script setup lang="ts">
withDefaults(
    defineProps<{
        type?: "error" | "loading";
        message?: string;
        width?: number;
    }>(),
    {
        type: undefined,
        message: undefined,
        width: undefined,
    },
);
</script>

<template>
    <BasicListItem
        class="basic-search-message"
        :class="`basic-search-message--type--${type}`"
        :style="`width: ${width}px`"
    >
        {{ message }}
        <slot v-if="!message" />
    </BasicListItem>
</template>

<style scoped lang="scss">
.basic-search-message {
    padding: 10px;
    font-size: var(--fs-small);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;

    &--type {
        &--error {
            color: var(--error);
        }

        &--loading {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }
}
</style>
