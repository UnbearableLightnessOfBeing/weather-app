<script setup lang="ts">
import { WeatherCondition } from "../types/requestTypes";
import { useConditionIcons } from "../composables/useConditionIcons";

defineProps<{
    conditions: WeatherCondition[];
    width?: number;
}>();

const { getIconUrl } = useConditionIcons();
</script>

<template>
    <div class="condition-icon-range" :style="`width: ${width}px`">
        <BasicConditionIcon
            v-for="condition in conditions"
            :key="condition.id"
            v-tooltip="{
                theme: 'custom-tooltip',
                content: condition.text,
            }"
            :icon-src="getIconUrl(condition.code)"
            :type="'tiny'"
        />
    </div>
</template>

<style scoped lang="scss">
.condition-icon-range {
    width: 1000px;
    min-width: 1000px;
    padding-inline: 5px;
    display: flex;
    justify-content: space-between;
}
</style>
