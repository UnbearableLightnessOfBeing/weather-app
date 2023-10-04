<script setup lang="ts">
defineProps<{
    activeDay: number;
}>();
</script>

<template>
    <div class="daily-forecast-info">daily forecast - {{ activeDay }}</div>
</template>

<style scoped lang="scss">
.daily-forecast-info {
    height: 565px;
}
</style>
