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
    <ItemRange :width="width">
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
    </ItemRange>
</template>

<style scoped lang="scss"></style>
