<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { Theme, ThemeType } from "../types/enums";
import { useI18n } from "vue-i18n";

defineProps<{
    modelValue: ThemeType;
}>();

defineEmits<{
    //eslint-disable-next-line
    (e: "update:modelValue", value: ThemeType): void;
}>();

const { t } = useI18n();

const themes = Object.values(Theme);

const themeSwitcher = ref<null | HTMLElement>(null);

const switcherWidth = ref(100);

const calculateWidth = () => {
    if (themeSwitcher.value) {
        switcherWidth.value = themeSwitcher.value.getBoundingClientRect().width;
    }
};

onMounted(calculateWidth);
onUpdated(calculateWidth);

const storedTheme = useStorage("theme", Theme.STANDARD);
</script>

<template>
    <VDropdown
        class="theme-switcher"
        :theme="'custom-dropdown'"
        :triggers="['click']"
        :popper-triggers="['click']"
        :auto-hide="true"
        :distance="0"
    >
        <template #default="{ shown }">
            <div
                ref="themeSwitcher"
                v-tooltip="{
                    theme: 'custom-tooltip',
                    content: t('theme.tooltip'),
                    disabled: shown,
                }"
                class="theme-switcher__content"
            >
                <div class="theme-switcher__caption">
                    {{ t("theme.caption") }}:
                </div>
                <div class="theme-switcher__lang">{{ modelValue }}</div>
            </div>
        </template>
        <template #popper>
            <div
                class="theme-switcher__popper"
                :style="`width: ${switcherWidth}px`"
            >
                <BasicListItem
                    v-for="theme in themes"
                    :key="theme"
                    class="theme-switcher__option"
                    @click="
                        () => {
                            $emit('update:modelValue', theme);
                            storedTheme = theme;
                        }
                    "
                >
                    {{ theme }}
                </BasicListItem>
            </div>
        </template>
    </VDropdown>
</template>

<style scoped lang="scss">
.theme-switcher {
    width: fit-content;
    height: 40px;
    background-color: var(--basic-light-dull);
    border-radius: 100px;
    cursor: pointer;

    &__content {
        display: flex;
        align-items: center;
        gap: 5px;
        padding-inline: 10px;
        padding-block: 7px;
    }

    &__caption {
        color: var(--basic-light-faded);
    }

    &__lang {
        font-size: var(--fs-stats-smaller);
    }

    &__option {
        color: var(--basic-light-faded);

        &:hover {
            color: var(--basic-light);
        }
    }
}
</style>
