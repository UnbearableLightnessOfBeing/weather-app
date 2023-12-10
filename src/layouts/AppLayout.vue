<script setup lang="ts">
import { ThemeType } from "../types/enums";

const props = defineProps<{
    theme: ThemeType;
}>();

const bgColor1 = computed(() => `var(--theme-${props.theme}-color-1)`);
const bgColor2 = computed(() => `var(--theme-${props.theme}-color-2)`);
</script>

<template>
    <div class="app-layout">
        <div class="app-layout__wrapper">
            <div class="app-layout__container">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@property --gradient-angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
}

@keyframes rotation {
    0% {
        --gradient-angle: 0deg;
    }
    100% {
        --gradient-angle: 360deg;
    }
}

.app-layout {
    z-index: 0;
    &__wrapper {
        position: relative;
        z-index: 0;

        &::after,
        &::before {
            content: "";
            position: absolute;
            border-radius: inherit;
            inset: 0;
            background: conic-gradient(
                from var(--gradient-angle),
                v-bind(bgColor1) 0%,
                v-bind(bgColor2) 65%,
                v-bind(bgColor1) 100%
            );
            z-index: -1;
            animation: rotation 12s linear infinite;
        }

        &::after {
            filter: blur(3.5rem);
        }
    }

    &__container {
        z-index: 100;
        padding-bottom: 20px;

        & > ::v-deep(* + *) {
            margin-top: 30px;
        }
    }

    @media screen and (min-width: 1440px) {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        &__wrapper {
            border-radius: 20px;
            // overflow: hidden;
        }

        &__container {
            display: grid;
            border-radius: inherit;
            grid-template-columns: 864px 576px;
            justify-content: center;
            align-content: center;
            padding: 0;
            height: 815px;

            & > ::v-deep(* + *) {
                margin: 0;
            }
        }
    }
}
</style>
