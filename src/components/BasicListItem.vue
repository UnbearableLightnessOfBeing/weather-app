<script setup lang="ts"></script>

<template>
    <div class="basic-list-item">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.basic-list-item {
    width: 100%;
    border-radius: 5px;
    padding: 10px;
    background-color: transparent;
    cursor: pointer;

    &:hover {
        background-color: var(--basic-light-dull);
    }
}
</style>
