<script setup lang="ts">
const isActive = ref(false);
</script>

<template>
    <div class="location-interface">
        <BasicSearch
            :active="isActive"
            @update:active="(value) => (isActive = value)"
        />
        <Transition appear name="location">
            <div v-if="!isActive" class="location-interface__location">
                <GeoLocationButton />
                <div class="location-interface__location-name">Location</div>
            </div>
        </Transition>
    </div>
</template>
<style scoped lang="scss">
.location-interface {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;
    padding-inline: 20px;
    padding-block: 10px;

    &__location {
        display: flex;
        gap: 30px;
        align-items: center;

        &-name {
            font-size: var(--fs-large-smaller);
            font-weight: var(--fw-normal-thiner);
        }
    }
}

.location {
    &-enter-active,
    &-leave-active {
        transition: all 0.3s ease-out;
    }

    &-enter-from,
    &-leave-to {
        transform: translateY(10px);
        opacity: 0;
    }
}
</style>
