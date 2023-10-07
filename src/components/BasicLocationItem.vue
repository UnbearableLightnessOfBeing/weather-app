<script setup lang="ts">
defineProps<{
    city: string;
    country: string;
}>();

defineEmits<{
    /* eslint-disable */
    (e: "update:location", value: string): void;
    /* eslint-enable */
}>();
</script>

<template>
    <div
        class="basic-location-item"
        @click="$emit('update:location', `${city}, ${country}`)"
    >
        <span class="basic-location-item__city">
            {{ city }}
        </span>
        {{ country }}
    </div>
</template>

<style scoped lang="scss">
.basic-location-item {
    width: 100%;
    border-radius: 5px;
    padding: 10px;
    background-color: transparent;
    font-size: var(--fs-tooltip);
    color: var(--basic-light-faded);
    cursor: pointer;

    &__city {
        font-size: var(--fs-small);
        color: var(--basic-light);
    }

    &:hover {
        background-color: var(--basic-light-dull);
    }
}
</style>
