<script setup lang="ts">
import { useScrollLock } from "@vueuse/core";

const props = defineProps<{
    isOpen: boolean;
}>();

defineEmits<{
    //eslint-disable-next-line
    (e: "update:isOpen", value: boolean): void;
}>();

const isBodyLocked = useScrollLock(document.body);

const computedIsOpen = computed(() => props.isOpen);

watch(computedIsOpen, () => {
    if (computedIsOpen.value) {
        isBodyLocked.value = true;
    } else {
        isBodyLocked.value = false;
    }
});
</script>

<template>
    <Teleport to="body">
        <Transition name="modal" appear>
            <div
                v-if="isOpen"
                class="basic-modal"
                @click="$emit('update:isOpen', false)"
            >
                <div class="basic-modal__content" @click.stop>
                    <slot />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped lang="scss">
.basic-modal {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: var(--basic-dark-dull);
    cursor: pointer;

    &__content {
        width: fit-content;
        height: fit-content;
        cursor: default;
    }
}

.modal {
    &-enter-active,
    &-leave-active {
        transition: all 0.3s ease-out;
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
        filter: blur(5px);
    }
}
</style>
