<script setup lang="ts">
withDefaults(
    defineProps<{
        type?: "error";
        message?: string;
    }>(),
    {
        type: undefined,
        message: undefined,
    }
);
</script>

<template>
    <div
        class="basic-search-message"
        :class="`basic-search-message--type--${type}`"
    >
        {{ message }}
        <slot v-if="!message" />
    </div>
</template>

<style scoped lang="scss">
.basic-search-message {
    padding: 10px;
    font-size: var(--fs-small);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    &--type {
        &--error {
            color: var(--error);
        }
    }
}
</style>
