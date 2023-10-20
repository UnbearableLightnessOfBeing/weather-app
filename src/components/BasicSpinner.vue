<script setup lang="ts">
import InlineSvg from "vue-inline-svg";
import SpinnerSvgUrl from "/interface/spinner.svg";
</script>

<template>
    <div class="basic-spinner">
        <InlineSvg :src="SpinnerSvgUrl" />
    </div>
</template>

<style scoped>
.basic-spinner {
    width: 30px;
    height: 30px;
    animation-name: spin;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.55, -1.03, 0.4, 1.78);
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(900deg);
    }
}
</style>
