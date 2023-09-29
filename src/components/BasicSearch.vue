<script setup lang="ts">
import SearchSvgUrl from "/interface/search.svg";
import InlineSvg from "vue-inline-svg";

const props = withDefaults(
    defineProps<{
        active?: boolean;
        // modelValue: string;
    }>(),
    {
        active: false,
    },
);

const emits = defineEmits<{
    /* eslint-disable */
    (e: "update:active", value: boolean): void;
    // (e: "update:modelValue", value: string): void;
    /* eslint-enable */
}>();

const isSearchActive = ref(false);

const isInputShown = ref(false);

watch(
    computed(() => props.active),
    () => {
        setTimeout(() => {
            isSearchActive.value = props.active;
        }, 300);
    },
);

watch(isSearchActive, () => {
    if (isSearchActive.value === false) {
        isInputShown.value = false;
        setTimeout(() => {
            emits("update:active", false);
        }, 300);
    } else {
        setTimeout(() => {
            isInputShown.value = true;
        }, 300);
    }
});

const searchValue = ref("");

const textInput = ref<HTMLInputElement | null>(null);

const openSearch = () => {
    if (!isSearchActive.value) {
        emits("update:active", true);
    }
    if (textInput.value) {
        textInput.value.focus();
    }
};

const bodyClickCallback = (): void => {
    isSearchActive.value = false;
};

onMounted(() => {
    document.body.addEventListener("click", bodyClickCallback);
});

onUnmounted(() => {
    document.body.removeEventListener("click", bodyClickCallback);
});
</script>

<template>
    <BasicGlassWrapper
        class="basic-search"
        :class="{ 'basic-search--active': isSearchActive }"
        :active="active"
        @click.stop="openSearch"
    >
        <InlineSvg :src="SearchSvgUrl" class="basic-search__icon" />
        <Transition name="input" appear>
            <BasicTextInput
                v-if="isInputShown"
                ref="textInput"
                v-model="searchValue"
                placeholder="Search"
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
    }

    &-enter-from {
        transform: translateX(30px);
        opacity: 0;
    }
}
</style>
