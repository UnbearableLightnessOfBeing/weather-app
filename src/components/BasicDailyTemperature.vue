<script setup lang="ts">
defineProps<{
    minValue: number;
    maxValue: number;
    measurement: "C" | "F";
}>();
</script>

<template>
    <div class="basic-daily-temperature">
        <div class="basic-daily-temperature__temp-item">
            <div class="basic-daily-temperature__temp">
                {{ maxValue }} °{{ measurement }}
            </div>
            <div class="basic-daily-temperature__border">max</div>
        </div>
        <div class="basic-daily-temperature__divider">/</div>
        <div class="basic-daily-temperature__temp-item">
            <div class="basic-daily-temperature__temp">
                {{ minValue }} °{{ measurement }}
            </div>
            <div class="basic-daily-temperature__border">min</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.basic-daily-temperature {
    display: flex;
    justify-content: center;
    gap: 15px;

    &__temp-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__temp,
    &__divider {
        font-size: var(--fs-large);
    }

    &__divider {
        font-weight: var(--fw-normal-thiner);
    }

    &__border {
        color: var(--basic-light-faded);
    }
}

@media screen and (min-width: 600px) {
    .basic-daily-temperature {
        justify-content: flex-start;
    }
}
</style>
