<script setup lang="ts">
import InlineSvg from "vue-inline-svg";

defineProps<{
    iconSrc?: string;
    title: string;
    measurement: string;
}>();
</script>

<template>
    <div class="chart-title">
        <InlineSvg
            v-if="iconSrc"
            :src="iconSrc"
            width="30"
            height="30"
            class="chart-title__icon"
        />
        <div class="chart-title__text">
            {{ title }}
        </div>
        <div class="chart-title__measurement">
            {{ measurement }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.chart-title {
    display: flex;
    gap: 5px;
    align-items: flex-end;

    &__text {
        font-size: var(--fs-stats);
    }

    &__measurement {
        font-size: var(--fs-small);
        color: var(--basic-light-faded);
    }
}
</style>
