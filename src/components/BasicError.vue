<script setup lang="ts">
import InlineSvg from "vue-inline-svg";
import ErrorSvgUrl from "/interface/error.svg";

defineProps<{
    text: string;
}>();
</script>

<template>
    <div class="basic-error">
        <InlineSvg :src="ErrorSvgUrl" class="basic-error__icon" />
        <p class="basic-error__text">{{ text }}</p>
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
