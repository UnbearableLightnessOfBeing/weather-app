<script setup lang="ts">
defineProps<{
    tooltipText: string;
}>();
</script>

<template>
    <div
        v-tooltip="{
            theme: 'custom-tooltip',
            content: tooltipText,
        }"
        class="info-sign"
    >
        <div class="info-sign__inner">i</div>
    </div>
</template>

<style scoped lang="scss">
.info-sign {
    display: inline-block;
    width: 25px;
    height: 25px;
    background-color: var(--basic-light-dull);
    border-radius: 100px;
    cursor: pointer;

    &__inner {
        font-size: var(--fs-stats-smaller);
        font-weight: var(--fw-bold);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
