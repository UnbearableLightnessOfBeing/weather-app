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
    <BasicListItem
        class="basic-location-item"
        @click="$emit('update:location', `${city}, ${country}`)"
    >
        <span class="basic-location-item__city">
            {{ city }}
        </span>
        {{ country }}
    </BasicListItem>
</template>

<style scoped lang="scss">
.basic-location-item {
    font-size: var(--fs-tooltip);
    color: var(--basic-light-faded);

    &__city {
        font-size: var(--fs-small);
        color: var(--basic-light);
    }
}
</style>
