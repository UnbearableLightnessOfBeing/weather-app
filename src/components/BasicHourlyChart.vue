<script setup lang="ts">
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import type { ChartData } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "vue-chartjs";
import colors from "../assets/colors/colors.json";

defineProps<{
    data: ChartData<"line">;
    //eslint-disable-next-line
    pointFormatter: (value: any) => any;
}>();

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
);
</script>

<template>
    <Line
        :data="data"
        :options="{
            responsive: true,
            maintainAspectRatio: false,
            borderColor: colors['basic-light-dull'],
            layout: {
                padding: {
                    top: 20,
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: false,
                },
                datalabels: {
                    color: colors['basic-light'],
                    anchor: 'end',
                    align: 'top',
                    offset: 2,
                    padding: {
                        top: 0,
                        bottom: 0,
                    },
                    formatter: pointFormatter,
                },
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false,
            },
            elements: {
                point: {
                    pointStyle: 'circle',
                    hoverRadius: 3,
                },
            },
            scales: {
                y: {
                    display: false,
                },
                x: {
                    grid: {
                        display: false,
                    },
                    border: {
                        color: colors['basic-light-dull'],
                    },
                    ticks: {
                        color: colors['basic-light-faded'],
                        font: {
                            size: 12,
                            weight: '500',
                        },
                    },
                },
            },
        }"
    />
</template>

<style scoped></style>
