<script setup lang="ts">
import InlineSvg from "vue-inline-svg";

const props = withDefaults(
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

const iconWidth = computed(() => {
    switch (props.type) {
        case "big":
            return 143;
        case "small":
            return 60;
        case "tiny":
            return 30;
    }
});

const iconHeight = computed(() => {
    switch (props.type) {
        case "big":
            return 100;
        case "small":
            return 43;
        case "tiny":
            return 20;
    }
});
</script>

<template>
    <div
        class="basic-condition-icon"
        :class="[`basic-condition-icon--type--${type}`]"
    >
        <BasicLoader v-if="isLoading" class="basic-condition-icon__filler" />
        <InlineSvg
            v-else-if="iconSrc"
            :width="iconWidth"
            :height="iconHeight"
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
