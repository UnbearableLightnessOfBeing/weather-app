<script setup lang="ts"></script>

<template>
    <div class="basic-astrology-clock">
        <div class="basic-astrology-clock__title">title</div>
        <div class="basic-astrology-clock__clock-site">
            <div class="basic-astrology-clock__clock">
                <div></div>
                <div class="basic-astrology-clock__pointers">
                    <div class="basic-astrology-clock__second-hand"></div>
                    <div class="basic-astrology-clock__minute-hand"></div>
                </div>
            </div>
            <div class="basic-astrology-clock__time">time</div>
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
        bottom: 0;
        border-radius: 100px;
        transform-origin: 0% 0%;
    }

    &__second-hand {
        width: 48px;
        height: 2px;
        background-color: #885ffc;
        transform: rotate(-90deg);
    }

    &__minute-hand {
        width: 34px;
        height: 4px;
        background-color: #828282;
        transform: rotate(0deg);
    }
}
</style>
