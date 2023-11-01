<script setup lang="ts">
const props = defineProps<{
    minValue?: number;
    maxValue?: number;
    measurement: "C" | "F";
    isLoading?: boolean;
}>();

const maxAndMinValuesExist = computed((): boolean => {
    return (
        typeof props.minValue !== "undefined" &&
        typeof props.maxValue !== "undefined"
    );
});
</script>

<template>
    <BasicLoader v-if="isLoading" class="basic-daily-temperature-filler" />
    <div
        v-else-if="maxAndMinValuesExist"
        class="basic-daily-temperature"
        v-bind="$attrs"
    >
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
    <BasicNodata v-else class="basic-daily-temperature-filler" />
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

    &-filler {
        width: 300px;
        height: 62px;
    }
}

@media screen and (min-width: 600px) {
    .basic-daily-temperature {
        justify-content: flex-start;
    }
}
</style>
