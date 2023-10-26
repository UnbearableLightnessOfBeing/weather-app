<script setup lang="ts">
import InlineSvg from "vue-inline-svg";
import MeterSvgUrl from "/interface/meter.svg";
import PointerSvgUrl from "/interface/pointer.svg";
import { useI18n } from "vue-i18n";
import { gsap } from "gsap";

const props = defineProps<{
    value?: number;
    maxValue: number;
    evaluation: string;
}>();

const { t } = useI18n();

const angleIndicator = computed(() => {
    if (typeof props.value === "undefined") return undefined;
    return (360 / 2 / props.maxValue) * props.value;
});

const indicator = ref<HTMLElement | null>(null);

const animateIndicator = (element: HTMLElement): void => {
    gsap.to(element, {
        rotate: angleIndicator.value,
        ease: "elastic.out(0.8, 0.22)",
        duration: 2,
    });
};

watch(angleIndicator, () => {
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
    <div class="quality-monitor">
        <InlineSvg :src="MeterSvgUrl" class="quality-monitor__meter" />
        <Transition appear @enter="onEnter">
            <div ref="indicator" class="quality-monitor__indicator">
                <InlineSvg
                    :src="PointerSvgUrl"
                    class="quality-monitor__point"
                />
            </div>
        </Transition>
        <div class="quality-monitor__content">
            <div v-if="value !== 0" class="quality-monitor__value">
                {{ value }}/{{ maxValue }}
            </div>
            <div class="quality-monitor__eval">
                {{ evaluation }}
                <InfoSign
                    v-if="value === 0"
                    :tooltip-text="t('api.signTooltip')"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.quality-monitor {
    width: 180px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    overflow: hidden;

    &__meter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 0;
    }

    &__indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 16px;
    }

    &__point {
        height: 16px;
        width: 16px;
        color: var(--basic-light);
        margin-left: 7.5px;
    }

    &__content {
        display: block;
        z-index: 1;

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
