<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <div class="basic-nodata">
        <div>{{ t("errors.noData") }}</div>
        <BasicInfoSign :tooltip-text="t('errors.noDataTooltip')" />
    </div>
</template>

<style scoped lang="scss">
.basic-nodata {
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: var(--error-bg);
}
</style>
