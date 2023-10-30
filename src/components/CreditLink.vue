<script setup lang="ts"></script>

<template>
    <div class="credit-link">
        Built with
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
    background-color: #f0b5ce;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
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
