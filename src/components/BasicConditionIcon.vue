<script setup lang="ts">
import InlineSvg from "vue-inline-svg";

withDefaults(
    defineProps<{
        iconSrc?: string;
        type?: "small" | "big" | "tiny";
        isLoading?: boolean;
    }>(),
    {
        iconSrc: undefined,
        type: "small",
        isLoading: false,
    },
);
</script>

<template>
    <div
        class="basic-condition-icon"
        :class="[`basic-condition-icon--type--${type}`]"
    >
        <BasicLoader v-if="isLoading" class="basic-condition-icon__filler" />
        <InlineSvg
            v-else-if="iconSrc"
            :width="type === 'big' ? 143 : type === 'small' ? 60 : 30"
            :height="type === 'big' ? 100 : type === 'small' ? 43 : 20"
            :src="iconSrc"
        />
        <BasicNodata v-else class="basic-condition-icon__filler" />
    </div>
</template>

<style scoped lang="scss">
.basic-condition-icon {
    filter: blur(0.3px);

    &--type {
        &--big {
            width: 143px;
            height: 100px;
        }

        &--small {
            width: 60px;
            height: 43px;
        }

        &--tiny {
            width: 30px;
            height: 20px;
        }
    }

    &__filler {
        width: 100%;
        height: 100%;
    }
}
</style>
