<script setup lang="ts">
defineProps<{
    title: string;
    time: string;
}>();
</script>

<template>
    <div class="basic-astrology-clock">
        <div class="basic-astrology-clock__title">{{ title }}</div>
        <div class="basic-astrology-clock__clock-site">
            <div class="basic-astrology-clock__clock">
                <div></div>
                <div class="basic-astrology-clock__pointers">
                    <Transition name="second-hand" appear>
                        <div class="basic-astrology-clock__second-hand"></div>
                    </Transition>
                    <Transition name="minute-hand" appear>
                        <div class="basic-astrology-clock__minute-hand"></div>
                    </Transition>
                    <Transition name="hour-hand" appear>
                        <div class="basic-astrology-clock__hour-hand"></div>
                    </Transition>
                </div>
            </div>
            <div class="basic-astrology-clock__time">{{ time }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.basic-astrology-clock {
    width: fit-content;

    & > * + * {
        margin-top: 28px;
    }

    &__clock-site {
        padding-inline: 18px;
        padding-block: 30px;
        background-color: var(--basic-light-dull);
        border-radius: 100px;
        width: 105px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        gap: 43px;
    }

    &__title,
    &__time {
        font-size: var(--fs-heading);
        text-align: center;
    }

    &__clock {
        display: grid;
        height: 35px;
        grid-template-columns: 1fr 1fr;
    }

    &__pointers {
        position: relative;
    }

    &__second-hand,
    &__minute-hand,
    &__hour-hand {
        position: absolute;
        z-index: 1;
        left: 0;
        border-radius: 100px;
        // transition: all 3s ease-out;
        animation-name: clock-spin;
        animation-duration: 3s;
    }

    &__second-hand {
        width: 48px;
        height: 2px;
        background-color: #885ffc;
        transform-origin: 0% 1px;
        transform: rotate(-90deg);
        bottom: -1px;
    }

    &__minute-hand {
        width: 34px;
        height: 4px;
        background-color: #828282;
        transform-origin: 0% 2px;
        transform: rotate(-180deg);
        bottom: -2px;
    }

    &__hour-hand {
        width: 25px;
        height: 4px;
        background-color: #e0e0e0;
        transform-origin: 0% 2px;
        transform: rotate(-145deg);
        bottom: -2px;
    }
}

.second-hand,
.minute-hand,
.hour-hand {
    &-enter-active {
        transition: all 2s cubic-bezier(0.05, 0.4, 0, 0.99);
    }
}

.second-hand-enter-from {
    transform: rotate(-2000deg);
}

.minute-hand-enter-from {
    transform: rotate(-1000deg);
}

.hour-hand-enter-from {
    transform: rotate(-500deg);
}
</style>
