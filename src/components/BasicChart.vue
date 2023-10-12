<script setup lang="ts">
import { useChart } from "../composables/useChart";
// import { scalesConfiguration } from "../configs/chartjsConfig";
import type { ChartData } from "chart.js";
import { Line } from "vue-chartjs";

defineProps<{
    id?: string;
    data: ChartData<"line">;
    // options: ChartOptions<"line">;
    options: any;
    //eslint-disable-next-line
    // pointFormatter?: (value: any) => any;
}>();

useChart();
</script>

<template>
    <Line :data="data" :options="options" />
</template>

<style scoped></style>
