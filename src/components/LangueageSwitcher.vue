<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useLocale } from "../composables/useLocale";
import { languages } from "../configs/i18nConfig";

const { t } = useI18n();

const { locale, setLocale } = useLocale();
</script>

<template>
    <VDropdown
        class="language-switcher"
        :theme="'custom-dropdown'"
        :triggers="['click']"
        :popper-triggers="['click']"
        :auto-hide="true"
        :distance="0"
    >
        <template #default="{ shown }">
            <div
                v-tooltip="{
                    theme: 'custom-tooltip',
                    content: t('language.tooltip'),
                    disabled: shown,
                }"
                class="language-switcher__content"
            >
                <div class="language-switcher__caption">
                    {{ t("language.caption") }}:
                </div>
                <div class="language-switcher__lang">{{ locale }}</div>
            </div>
        </template>
        <template #popper>
            <div class="language-switcher__popper">
                <BasicListItem
                    v-for="lang in languages"
                    :key="lang.name"
                    class="language-switcher__option"
                    @click="setLocale(lang.name)"
                >
                    {{ lang.title }}
                </BasicListItem>
            </div>
        </template>
    </VDropdown>
</template>

<style scoped lang="scss">
.language-switcher {
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
