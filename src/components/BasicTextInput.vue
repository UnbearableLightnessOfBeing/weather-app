<script setup lang="ts">
defineProps<{
    modelValue: string;
}>();

defineEmits<{
    /* eslint-disable */
    (e: "update:modelValue", value: string): void;
    (e: "focusout"): void;
    /* eslint-enable */
}>();

const input = ref<HTMLInputElement | null>(null);

const focusInput = () => {
    console.log("focused");
    if (input.value) {
        input.value.focus();
    }
};

onMounted(() => {
    focusInput();
});

defineExpose({
    focusInput,
});
</script>

<template>
    <input
        ref="input"
        type="text"
        :value="modelValue"
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

<style scoped></style>
