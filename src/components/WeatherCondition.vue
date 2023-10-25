<script setup lang="ts">
import { useConditionIcons } from "../composables/useConditionIcons";
import { WeatherCondition } from "../types/requestTypes";

const props = withDefaults(
    defineProps<{
        condition?: WeatherCondition;
        isDay?: boolean;
        isLoading: boolean;
    }>(),
    {
        isDay: undefined,
        condition: undefined,
    },
);

const { getIconUrl } = useConditionIcons();

const iconSrcUrl = computed(() => {
    if (props.condition) {
        return getIconUrl(props.condition.code, props.isDay ?? false);
    }
});
</script>

<template>
    <div class="weather-condition">
        <BasicConditionIcon
            type="big"
            :is-loading="isLoading"
            :icon-src="iconSrcUrl"
        />
        <BasicLoader v-if="isLoading" class="weather-condition__text-filler" />
        <div v-else-if="condition" class="weather-condition__text">
            {{ condition.text }}
        </div>
        <BasicNodata v-else class="weather-condition__text-filler" />
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

    &__text-filler {
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
