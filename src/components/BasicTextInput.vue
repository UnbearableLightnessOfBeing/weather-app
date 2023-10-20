<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: string;
        placeholder?: string;
    }>(),
    {
        placeholder: undefined,
    },
);

const emits = defineEmits<{
    /* eslint-disable */
    (e: "update:modelValue", value: string): void;
    /* eslint-enable */
}>();

const input = ref<HTMLInputElement | null>(null);

const focus = () => {
    if (input.value) {
        input.value.focus();
    }
};

onMounted(() => focus());

defineExpose({ focus });

const writableComputed = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits("update:modelValue", value);
    },
});
</script>

<template>
    <input
        ref="input"
        v-model="writableComputed"
        type="text"
        :placeholder="placeholder"
        class="basic-text-input"
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
