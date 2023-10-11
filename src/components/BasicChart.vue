<script setup lang="ts">
import { useChart } from "../composables/useChart";
import { scalesConfiguration } from "../configs/chartjsConfig";
import type { ChartData } from "chart.js";
import { Line } from "vue-chartjs";

defineProps<{
    data: ChartData<"line">;
    //eslint-disable-next-line
    pointFormatter?: (value: any) => any;
}>();

useChart();
</script>

<template>
    <Line
        :data="data"
        :options="{
            scales: scalesConfiguration,
            plugins: {
                datalabels: {
                    formatter: pointFormatter,
                },
            },
        }"
    />
</template>

<style scoped></style>
