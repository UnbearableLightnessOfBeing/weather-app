<script setup lang="ts">
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
    <div class="basic-loader" :style="computedStyles">
        <div class="basic-loader__shimmer"></div>
    </div>
</template>

<style scoped lang="scss">
.basic-loader {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    background: var(--basic-light-dull);

    &__shimmer {
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(
            100deg,
            rgba(255, 255, 255, 0) 20%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 80%
        );
        animation: shimmer 1s infinite linear;
    }
}

@keyframes shimmer {
    from {
        transform: translateX(-200%);
    }
    35% {
        transform: translateX(200%);
    }
    to {
        transform: translateX(200%);
    }
}
</style>
