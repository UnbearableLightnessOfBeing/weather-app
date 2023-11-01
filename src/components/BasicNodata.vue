<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
    width?: number;
    height?: number;
    borderRadius?: number;
}>();

const computedStyles = computed((): string => {
    let style = "";

    if (props.width) {
        style += "width: " + props.width + "px; ";
    }
    if (props.height) {
        style += "height: " + props.height + "px; ";
    }
    if (props.borderRadius) {
        style += "border-radius: " + props.borderRadius + "px; ";
    }

    return style;
});
</script>

<template>
    <div class="basic-nodata" :style="computedStyles">
        <div>{{ t("errors.noData") }}</div>
        <InfoSign :tooltip-text="t('errors.noDataTooltip')" />
    </div>
</template>

<style scoped lang="scss">
.basic-nodata {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    gap: 5px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: var(--basic-dark-dull);
}
</style>
