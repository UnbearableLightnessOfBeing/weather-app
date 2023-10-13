<script setup lang="ts">
defineProps<{
    width?: number;
}>();
</script>

<template>
    <div class="item-range" :style="`width: ${width}px`">
        <slot />
    </div>
</template>

<style scoped>
.item-range {
    width: 1000px;
    min-width: 1000px;
    padding-inline: 5px;
    display: flex;
    justify-content: space-between;
}
</style>
