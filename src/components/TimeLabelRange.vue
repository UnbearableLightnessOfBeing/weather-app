<script setup lang="ts">
defineProps<{
    timeLabels: string[];
}>();
</script>

<template>
    <ItemRange class="time-label-range">
        <div
            v-for="value in timeLabels"
            :key="value"
            class="time-label-range__label"
        >
            {{ value }}
        </div>
    </ItemRange>
</template>

<style scoped lang="scss">
.time-label-range {
    &__label {
        font-size: 12px;
    }
}
</style>
