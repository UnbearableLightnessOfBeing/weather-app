<script setup lang="ts">
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "vue-chartjs";

defineProps<{
    data: ChartData<"line">;
    options: ChartOptions<"line">;
}>();
</script>

<template>
    <Line :data="data" :options="options" />
</template>

<style scoped></style>
