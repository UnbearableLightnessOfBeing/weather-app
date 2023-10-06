<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
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
                <div class="language-switcher__option" @click="locale = 'en'">
                    English
                </div>
                <div class="language-switcher__option" @click="locale = 'ru'">
                    Русский
                </div>
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
        padding-inline: 15px;
        padding-block: 10px;
        cursor: pointer;

        &:hover {
            background-color: var(--basic-light-dull);
            transition: all 0.125s ease-in-out;
        }
    }
}
</style>
