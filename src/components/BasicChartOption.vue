<script setup lang="ts">
defineProps<{
    name: string;
    measurement?: string;
    active?: boolean;
}>();
</script>

<template>
    <BasicGlassWrapper
        :active="active"
        class="basic-chart-option"
        :class="{ 'basic-chart-option--active': active }"
    >
        <div>
            {{ name }}
        </div>
        <div v-if="measurement" class="basic-chart-option__measurement">
            {{ measurement }}
        </div>
    </BasicGlassWrapper>
</template>

<style scoped lang="scss">
.basic-chart-option {
    padding-block: 5px;
    padding-inline: 10px;
    border-radius: 100px;
    display: flex;
    align-items: flex-end;
    gap: 5px;
    cursor: pointer;
    box-shadow: none;

    &--active {
        background-color: var(--accent-200);
    }

    &__measurement {
        color: var(--basic-light-faded);
        font-size: var(--fs-tooltip);
    }
}
</style>
