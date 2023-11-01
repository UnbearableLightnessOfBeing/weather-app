<script setup lang="ts"></script>

<template>
    <div class="app-layout">
        <div class="app-layout__wrapper">
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
.app-layout {
    &__wrapper {
        padding-bottom: 20px;
        background: var(--bg-light);

        & > ::v-deep(* + *) {
            margin-top: 30px;
        }
    }

    @media screen and (min-width: 1440px) {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        &__wrapper {
            display: grid;
            grid-template-columns: 864px 576px;
            justify-content: center;
            align-content: center;
            padding: 0;
            height: 815px;
            border-radius: 20px;
            overflow: hidden;

            & > ::v-deep(* + *) {
                margin: 0;
            }
        }
    }
}
</style>
