<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <div class="credit-link">
        {{ t("creditLinkText") }}
        <a
            href="https://www.weatherapi.com/"
            target="_blank"
            class="credit-link__link"
        >
            Weather API
        </a>
    </div>
</template>

<style scoped lang="scss">
.credit-link {
    color: var(--basic-light-faded);
    text-shadow: none;

    &__link {
        color: inherit;
        font-weight: 600;
        text-decoration: none;
        transition: color 0.125s ease;
        text-shadow: inherit;

        &:hover {
            color: var(--accent-500);
        }
    }
}
</style>
