<script setup lang="ts">
const popperWidth = ref(450 - 40);

const calculatePopperWidth = () => {
    if (document.body.clientWidth <= 450) {
        popperWidth.value = document.body.clientWidth - 40;
    }
};

onMounted(() => {
    window.addEventListener("resize", calculatePopperWidth);
    calculatePopperWidth();
});

onUnmounted(() => {
    window.removeEventListener("resize", calculatePopperWidth);
});
</script>

<template>
    <div :style="`width: ${popperWidth}px`" @click.stop>
        <slot />
    </div>
</template>

<style scoped></style>
