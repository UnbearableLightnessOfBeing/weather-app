<script setup lang="ts">
const props = defineProps<{
    modelValue: "C" | "F";
}>();

const emits = defineEmits<{
    //eslint-disable-next-line
    (e: "update:modelValue", value: "C" | "F"): void;
}>();

const isToggled = computed(() => props.modelValue === "F");

const toggle = () => {
    if (isToggled.value) {
        emits("update:modelValue", "C");
    } else emits("update:modelValue", "F");
};
</script>

<template>
    <div
        class="measurement-toggler"
        :class="{ 'measurement-toggler--toggled': isToggled }"
        @click="toggle"
    >
        <div class="measurement-toggler__option">C</div>
        <div class="measurement-toggler__option">F</div>
    </div>
</template>

<style scoped lang="scss">
.measurement-toggler {
    width: 58px;
    height: calc(58px * 2);
    background-color: var(--basic-light-dull);
    border-radius: 12px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &__option {
        width: 100%;
        height: 58px;
        display: grid;
        place-content: center;
        font-size: var(--fs-stats);
        font-weight: var(--fw-normal-thiner);
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
}

@media screen and (min-width: 600px) {
    .measurement-toggler {
        height: 40px;
        width: fit-content;
        display: flex;
        border-radius: 100px;
        padding: 6px 20px;
        gap: 30px;

        &__option {
            width: fit-content;
            height: fit-content;
            font-size: var(--fs-normal);
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
