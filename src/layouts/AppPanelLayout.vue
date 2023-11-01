<script setup lang="ts"></script>

<template>
    <div class="app-panel-layout">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.app-panel-layout {
    max-width: 864px;
    margin-inline: auto;

    @media screen and (min-width: 1440px) {
        margin-inline: 0;
        height: 815px;
    }
}
</style>
