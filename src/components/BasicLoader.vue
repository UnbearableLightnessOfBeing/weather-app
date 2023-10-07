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
    <div class="basic-loader" :style="computedStyles"></div>
</template>

<style scoped lang="scss">
.basic-loader {
    border: 1px solid red;
    width: 100%;
    height: 100%;
    border-radius: 10px;
}
</style>
