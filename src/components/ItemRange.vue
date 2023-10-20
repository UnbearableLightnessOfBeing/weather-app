<script setup lang="ts"></script>

<template>
    <div class="item-range">
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
