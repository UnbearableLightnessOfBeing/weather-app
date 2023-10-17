<script setup lang="ts">
import { ExtendedWeatherCondition } from "../types/requestTypes";
import { useConditionIcons } from "../composables/useConditionIcons";

defineProps<{
    conditions: ExtendedWeatherCondition[];
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
            :icon-src="getIconUrl(condition.code, condition.is_day)"
            :type="'tiny'"
        />
    </ItemRange>
</template>

<style scoped lang="scss"></style>
