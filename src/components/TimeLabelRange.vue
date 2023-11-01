<script setup lang="ts">
defineProps<{
    timeLabels: string[];
}>();
</script>

<template>
    <ItemRange class="time-label-range">
        <div
            v-for="label in timeLabels"
            :key="label"
            class="time-label-range__label"
        >
            {{ label }}
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
