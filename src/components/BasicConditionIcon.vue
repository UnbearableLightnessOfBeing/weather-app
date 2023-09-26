<script setup lang="ts">
import InlineSvg from "vue-inline-svg";

withDefaults(
    defineProps<{
        iconSrc: string;
        type?: "small" | "big";
    }>(),
    {
        type: "small",
    },
);
</script>

<template>
    <div
        class="basic-condition-icon"
        :class="`basic-condition-icon--type--${type}`"
    >
        <InlineSvg :src="iconSrc" />
    </div>
</template>

<style scoped lang="scss">
.basic-condition-icon {
    &--type {
        &--big {
            width: 143px;
            height: 100px;
        }

        &--small {
            width: 60px;
            height: 43px;
        }
    }
}
</style>
