<script setup lang="ts">
type MesurementType = "C" | "F";

defineProps<{
    value: number;
    mesurement: MesurementType;
}>();
</script>

<template>
    <div class="basic-temperature">
        <div class="basic-temperature__value">{{ value }}</div>
        <div class="basic-temperature__mesurement">°{{ mesurement }}</div>
    </div>
</template>

<style scoped lang="scss">
.basic-temperature {
    width: fit-content;
    height: fit-content;
    display: flex;
    gap: 10px;

    &__value {
        font-size: var(--fs-huge-smaller);
        font-weight: var(--fw-normal-thiner);
        text-shadow: -4px 2.5px 0.75px rgba(0, 0, 0, 0.1);
    }

    &__mesurement {
        font-size: var(--fs-large-smaller);
        text-shadow: -4px 2.5px 0.75px rgba(0, 0, 0, 0.1);
    }
}

@media screen and (min-width: 600px) {
    .basic-temperature {
        &__value {
            font-size: var(--fs-huge);
            font-weight: var(--fw-thin);
        }
    }
}
</style>
