<script setup lang="ts">
import { useConditionIcons } from "../composables/useConditionIcons";
import { WeatherCondition } from "../types/requestTypes";

defineProps<{
    condition?: WeatherCondition;
    isLoading: boolean;
}>();

const { getIconUrl } = useConditionIcons();
</script>

<template>
    <div class="weather-condition">
        <BasicLoader v-if="isLoading" class="weather-condition__icon-loader" />
        <BasicConditionIcon
            v-else-if="condition"
            type="big"
            :icon-src="getIconUrl(condition.code)"
        />
        <BasicNodata v-else class="weather-condition__no-data" />
        <BasicLoader v-if="isLoading" class="weather-condition__text-loader" />
        <div v-else-if="condition" class="weather-condition__text">
            {{ condition.text }}
        </div>
        <BasicNodata v-else class="weather-condition__no-data" />
    </div>
</template>

<style scoped lang="scss">
.weather-condition {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;

    &__text {
        font-size: var(--fs-large);
        font-weight: var(--fw-normal-thiner);
        padding-right: 90px;
    }

    &__icon-loader,
    &__no-data {
        width: 143px;
        height: 100px;
    }

    &__text-loader {
        width: 160px;
        height: 43px;
    }
}

@media screen and (min-width: 600px) {
    .weather-condition {
        flex-direction: row;
        align-items: center;

        &__text {
            padding-right: 0px;
        }
    }
}
</style>
