<script setup lang="ts">
import BasicTextInput from "../components/BasicTextInput.vue";
import SearchSvgUrl from "/interface/search.svg";
import InlineSvg from "vue-inline-svg";
import { createDebounce } from "../utils/debounce";
import { useI18n } from "vue-i18n";

const props = defineProps<{
    active: boolean;
    isSearchActive: boolean;
    modelValue: string;
}>();

const emits = defineEmits<{
    /* eslint-disable */
    (e: "update:active", value: boolean): void;
    (e: "update:modelValue", value: string): void;
    (e: "update:isSearchActive", value: boolean): void;
    /* eslint-enable */
}>();

const { t } = useI18n();

const textInput = ref<InstanceType<typeof BasicTextInput> | null>(null);

const openSearch = () => {
    if (!props.isSearchActive) {
        emits("update:active", true);
    }
    if (textInput.value) {
        textInput.value.focus();
    }
};

const bodyClickCallback = (): void => {
    emits("update:isSearchActive", false);
};

onMounted(() => {
    document.body.addEventListener("click", bodyClickCallback);
});

onUnmounted(() => {
    document.body.removeEventListener("click", bodyClickCallback);
});

const debounceModelValue = createDebounce(
    (value: string) => emits("update:modelValue", value),
    400,
);

defineExpose({
    debounceModelValue,
});
</script>

<template>
    <BasicGlassWrapper
        v-tooltip="{
            theme: 'custom-tooltip',
            content: 'Search for location',
            disabled: active,
        }"
        class="basic-search"
        :class="{ 'basic-search--active': isSearchActive }"
        :active="active"
        @click.stop="openSearch"
    >
        <InlineSvg :src="SearchSvgUrl" class="basic-search__icon" />
        <Transition name="input" appear>
            <BasicTextInput
                v-if="isSearchActive"
                ref="textInput"
                :model-value="modelValue"
                :placeholder="t('search.placeholder')"
                @update:model-value="debounceModelValue"
            />
        </Transition>
    </BasicGlassWrapper>
</template>

<style scoped lang="scss">
@property --myColor1 {
    syntax: "<color>";
    initial-value: rgba(255, 255, 255, 0.5);
    inherits: false;
}

@property --myColor2 {
    syntax: "<color>";
    initial-value: rgba(255, 255, 255, 0.3);
    inherits: false;
}

@property --myColor3 {
    syntax: "<color>";
    initial-value: rgba(255, 255, 255, 0.1);
    inherits: false;
}

.basic-search {
    width: 58px;
    min-width: 58px;
    height: 58px;
    padding: 15px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: space-between;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    background: linear-gradient(
        45deg,
        var(--myColor1),
        var(--myColor2),
        var(--myColor3)
    );

    transition:
        --myColor1 0.3s,
        --myColor3 0.3s,
        width 0.3s cubic-bezier(0.7, -0.01, 0.87, 0.21);

    &:hover {
        --myColor1: rgba(255, 255, 255, 0.1);
        --myColor3: rgba(255, 255, 255, 0.5);
    }

    &__icon {
        width: 26px;
        height: 26px;
        min-width: 26px;
        min-height: 26px;
    }

    &--active,
    &--active:hover {
        width: 100%;
        --myColor1: rgba(255, 255, 255, 0.1);
        --myColor2: rgba(255, 255, 255, 0.5);
        --myColor3: rgba(255, 255, 255, 0.1);
    }
}

.input {
    &-enter-active {
        transition: all 0.3s ease-out;
        transition-delay: 0.3s;
    }

    &-enter-from {
        transform: translateX(30px);
        opacity: 0;
    }
}
</style>
