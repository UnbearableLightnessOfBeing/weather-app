<script setup lang="ts">
import InlineSvg from "vue-inline-svg";
import MeterSvgUrl from "/interface/meter.svg";
import PointerSvgUrl from "/interface/pointer.svg";

import { gsap } from "gsap";

const props = defineProps<{
    value: number;
    maxValue: number;
    evaluation: string;
}>();

const indicatorAngle = computed(() => {
    return (360 / 2 / props.maxValue) * props.value;
});

const indicator = ref<HTMLElement | null>(null);

const animateIndicator = (element: HTMLElement): void => {
    gsap.to(element, {
        rotate: indicatorAngle.value,
        ease: "elastic.out(0.8, 0.22)",
        duration: 2,
    });
};

watch(indicatorAngle, () => {
    if (indicator.value) {
        animateIndicator(indicator.value);
    }
});

const onEnter = (el: any, done: any) => {
    animateIndicator(el);
    done();
};
</script>

<template>
    <div class="basic-quality-monitor">
        <InlineSvg :src="MeterSvgUrl" class="basic-quality-monitor__meter" />
        <Transition appear @enter="onEnter">
            <div ref="indicator" class="basic-quality-monitor__indicator">
                <InlineSvg
                    :src="PointerSvgUrl"
                    class="basic-quality-monitor__point"
                />
            </div>
        </Transition>
        <div class="basic-quality-monitor__content">
            <div class="basic-quality-monitor__value">
                {{ value }}/{{ maxValue }}
            </div>
            <div class="basic-quality-monitor__eval">{{ evaluation }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.basic-quality-monitor {
    width: 180px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;

    &__meter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: -1;
    }

    &__indicator {
        position: absolute;
        z-index: -1;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 16px;
        // transition: all 2s ease-out;
    }

    &__point {
        height: 16px;
        width: 16px;
        color: var(--basic-light);
        margin-left: 7.5px;
    }

    &__content {
        display: block;

        & > * + * {
            margin-top: 8px;
        }
    }

    &__value,
    &__eval {
        text-align: center;
        font-weight: var(--fw-normal-thiner);
    }

    &__value {
        font-size: var(--fs-stats-smaller);
    }

    &__eval {
        font-size: var(--fs-stats);
    }
}
</style>
