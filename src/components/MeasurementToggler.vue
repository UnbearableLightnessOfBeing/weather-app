<script setup lang="ts">
import { useMeasurement } from "../composables/useMeasurement";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const { measurement, toggleMeasurement } = useMeasurement();

const isToggled = computed(() => measurement.value === "F");

const options = ["C", "F"];
</script>

<template>
    <div
        v-tooltip="{
            content: t('measurementToggler.tooltipMessage'),
            theme: 'custom-tooltip',
        }"
        class="measurement-toggler"
        :class="{ 'measurement-toggler--toggled': isToggled }"
        @click="toggleMeasurement"
    >
        <div
            v-for="option in options"
            :key="option"
            class="measurement-toggler__option"
        >
            <span class="measurement-toggler__degree-sign">°</span>{{ option }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.measurement-toggler {
    width: 58px;
    min-width: 58px;
    height: calc(58px * 2);
    background-color: var(--basic-light-dull);
    border-radius: 12px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &__option {
        width: 100%;
        height: 58px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: var(--fs-stats);
        font-weight: var(--fw-normal-thiner);
    }

    &__degree-sign {
        display: inline;
    }

    &::before {
        content: "";
        position: absolute;
        background-color: var(--basic-light-dull);
        border-radius: 12px;
        top: 0px;
        left: 0;
        width: 100%;
        height: 58px;
        transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    &--toggled {
        &::before {
            top: 58px;
        }
    }

    @media screen and (min-width: 600px) {
        height: 40px;
        width: 102px;
        min-width: 102px;
        display: flex;
        border-radius: 100px;
        padding: 6px 20px;
        gap: 30px;

        &__option {
            width: fit-content;
            height: fit-content;
            font-size: var(--fs-normal);
        }

        &__degree-sign {
            display: none;
        }

        &::before {
            border-radius: 100px;
            height: 100%;
            width: 56px;
        }

        &--toggled {
            &::before {
                top: 0;
                left: 45px;
            }
        }
    }
}
</style>
