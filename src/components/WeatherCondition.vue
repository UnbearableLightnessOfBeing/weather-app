<script setup lang="ts">
import { useConditionIcons } from "../composables/useConditionIcons";

defineProps<{
    condition: any;
}>();

const { getIconUrl } = useConditionIcons();
</script>

<template>
    <div class="weather-condition">
        <BasicConditionIcon
            v-if="condition"
            type="big"
            :icon-src="getIconUrl(condition.code)"
        />
        <BasicLoader v-else class="weather-condition__icon-loader" />
        <div v-if="condition" class="weather-condition__text">
            {{ condition.text }}
        </div>
        <BasicLoader v-else class="weather-condition__text-loader" />
    </div>
</template>

<style scoped lang="scss">
.weather-condition {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    &__text {
        font-size: var(--fs-large);
        font-weight: var(--fw-normal-thiner);
    }

    &__icon-loader {
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
    }
}
</style>
