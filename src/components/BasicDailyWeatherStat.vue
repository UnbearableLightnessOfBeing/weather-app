<script setup lang="ts">
import InlineSvg from "vue-inline-svg";

defineProps<{
    iconSrc: string;
    title: string;
    value: number;
    measurement: string;
}>();
</script>

<template>
    <div class="basic-daily-weather-stat">
        <div class="basic-daily-weather-stat__left">
            <InlineSvg :src="iconSrc" class="basic-daily-weather-stat__icon" />
            <div class="basic-daily-weather-stat__title">{{ title }}</div>
        </div>
        <div class="basic-daily-weather-stat__right">
            <div class="basic-daily-weather-stat__value">
                {{ Math.round(value) }}
            </div>
            <div class="basic-daily-weather-stat__measurement">
                {{ measurement }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.basic-daily-weather-stat {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 5px;
    justify-items: center;
    padding: 5px;
    border-radius: 5px;
    place-content: center;
    background-color: var(--basic-light-dull);

    &__icon {
        width: 24px;
        height: 24px;
    }

    &__title {
        font-size: var(--fs-tooltip);
        text-align: center;
    }

    &__left {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
    }

    &__right {
        display: flex;
        align-items: flex-end;
        height: fit-content;
        align-self: center;
        gap: 3px;
    }

    &__value {
        // font-size: var(--fs-normal);
        font-size: var(--fs-stats-smaller);
    }

    &__measurement {
        font-weight: var(--fw-normal-thiner);
        font-size: var(--fs-tooltip);
    }
}

@media screen and (min-width: 600px) {
    .basic-daily-weather-stat {
        padding: 10px;

        &__icon {
            width: 36px;
            height: 36px;
        }

        &__title,
        &__measurement {
            font-size: var(--fs-small);
        }

        &__value {
            font-size: var(--fs-stats);
        }
    }
}
</style>
