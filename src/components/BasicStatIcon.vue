<script setup lang="ts">
import InlineSvg from "vue-inline-svg";

defineProps<{
    iconSrc: string;
}>();
</script>

<template>
    <div class="basic-stat-icon">
        <InlineSvg :src="iconSrc" />
    </div>
</template>

<style scoped lang="scss">
.basic-stat-icon {
    width: 22px;
    height: 22px;
}
</style>
