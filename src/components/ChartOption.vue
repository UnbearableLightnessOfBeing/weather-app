<script setup lang="ts">
defineProps<{
    name: string;
    measurement?: string;
    active?: boolean;
}>();
</script>

<template>
    <BasicGlassWrapper :active="active" :colored="active" class="chart-option">
        <div>
            {{ name }}
        </div>
        <div v-if="measurement" class="chart-option__measurement">
            {{ measurement }}
        </div>
    </BasicGlassWrapper>
</template>

<style scoped lang="scss">
.chart-option {
    padding-block: 5px;
    padding-inline: 10px;
    border-radius: 100px;
    display: flex;
    align-items: flex-end;
    gap: 5px;
    cursor: pointer;
    box-shadow: none;

    &__measurement {
        color: var(--basic-light-faded);
        font-size: var(--fs-tooltip);
    }
}
</style>
