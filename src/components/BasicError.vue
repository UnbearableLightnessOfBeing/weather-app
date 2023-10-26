<script setup lang="ts">
import InlineSvg from "vue-inline-svg";
import ErrorSvgUrl from "/interface/error.svg";

const props = defineProps<{
    text?: string;
    iconWidth?: number;
    iconHeight?: number;
    iconSrc?: string;
}>();

const styles = computed(() => {
    let style = "";

    if (props.iconWidth) {
        style += `width: ${props.iconWidth}; `;
    }
    if (props.iconHeight) {
        style += `height: ${props.iconHeight}; `;
    }

    return style;
});
</script>

<template>
    <div class="basic-error">
        <InlineSvg
            :src="iconSrc ?? ErrorSvgUrl"
            class="basic-error__icon"
            :style="styles"
        />
        <p v-if="text" class="basic-error__text">{{ text }}</p>
    </div>
</template>

<style scoped lang="scss">
.basic-error {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;

    &__icon,
    &__text {
        color: var(--error);
    }

    &__icon {
        width: 36px;
        height: 36px;
    }

    &__text {
        font-size: var(--fs-heading);
        font-weight: var(--fw-nomal-thiner);
    }
}
</style>
