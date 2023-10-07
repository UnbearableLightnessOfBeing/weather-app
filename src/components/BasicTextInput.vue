<script setup lang="ts">
withDefaults(
    defineProps<{
        modelValue: string;
        placeholder?: string;
    }>(),
    {
        placeholder: undefined,
    },
);

defineEmits<{
    /* eslint-disable */
    (e: "update:modelValue", value: string): void;
    (e: "focusout"): void;
    /* eslint-enable */
}>();

const input = ref<HTMLInputElement | null>(null);

const focus = () => {
    if (input.value) {
        input.value.focus();
    }
};

onMounted(() => {
    focus();
});

defineExpose({
    focus,
});
</script>

<template>
    <input
        ref="input"
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        class="basic-text-input"
        @input="
            (e: Event) => {
                $emit(
                    'update:modelValue',
                    (e.target as HTMLInputElement).value,
                );
            }
        "
        @focusout="$emit('focusout')"
    />
</template>

<style scoped lang="scss">
.basic-text-input {
    outline: none;
    background: transparent;
    border: none;
    color: var(--basic-light);
    font-size: var(--fs-normal);
    max-width: 220px;
    transition: all 0.2s ease;

    &::placeholder {
        color: var(--basic-light-dull);
    }
}

@media screen and (min-width: 600px) {
    .basic-text-input {
        max-width: 320px;
    }
}
</style>
