<script setup lang="ts">
import { useI18n } from "vue-i18n";
import InlineSvg from "vue-inline-svg";
import IconSvgUrl from "/interface/details.svg";

defineProps<{
    title: string;
}>();

const { t } = useI18n();
</script>

<template>
    <div class="forecast-heading">
        <div class="forecast-heading__title">
            {{ title }}
        </div>
        <div class="forecast-heading__details">
            <InlineSvg :src="IconSvgUrl" width="20" height="20" />
            <div>
                {{ t("chart.details") }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.forecast-heading {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    &__title {
        font-size: var(--fs-stats);
    }

    &__details {
        display: flex;
        gap: 2px;
        align-items: center;
        font-size: var(--fs-small);
        cursor: pointer;
        color: var(--basic-light-faded);

        &:hover {
            color: var(--basic-light);
        }
    }
}
</style>
