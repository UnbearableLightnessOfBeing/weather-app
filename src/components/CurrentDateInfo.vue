<script setup lang="ts">
import dayNames from "../assets/date/dayNames.json";

type Language = "en" | "ru";

const props = defineProps<{
    language: Language;
    unixDate?: Date;
    timeHidden?: boolean;
    isLoading?: boolean;
}>();

const monthNames = computed(() => {
    if (props.language === "en") {
        return dayNames.en.full;
    } else return dayNames.ru.full;
});

const date = computed(() =>
    props.unixDate ? props.unixDate.getDate() : undefined,
);

const month = computed(() => {
    if (props.unixDate) {
        const monthName = props.unixDate.toLocaleString(props.language, {
            month: "long",
        });
        if (monthName.length <= 4) {
            return monthName;
        } else return monthName.slice(0, 3);
    } else return undefined;
});

const year = computed(() => {
    if (props.unixDate) {
        const year = props.unixDate.getFullYear().toString();
        return `‘${year.slice(year.length - 2)}`;
    } else return undefined;
});

const day = computed(() => {
    if (props.unixDate) {
        return monthNames.value[props.unixDate.getDay()];
    } else return undefined;
});

const time = computed(() => {
    if (props.unixDate) {
        const timeString = props.unixDate.toLocaleTimeString(props.language);
        const [time, dayPeriod] = timeString.split(" ");
        const splitTime = time.split(":");
        return (
            splitTime[0] +
            ":" +
            splitTime[1] +
            (dayPeriod ? ` ${dayPeriod}` : "")
        );
    } else return undefined;
});
</script>

<template>
    <BasicLoader v-if="isLoading" class="current-date-info-filler" />
    <div v-else-if="unixDate" class="current-date-info">
        <div class="current-date-info__dmy">
            {{ date }} {{ month }} {{ year }}
        </div>
        <div class="current-date-info__day-time">
            <div class="current-date-info__day">
                {{ day }}
            </div>
            <BasicVerticalDivider v-if="!timeHidden" />
            <div v-if="!timeHidden" class="current-date-info__time">
                {{ time }}
            </div>
        </div>
    </div>
    <BasicNodata v-else class="current-date-info-filler" />
</template>

<style scoped lang="scss">
.current-date-info {
    width: fit-content;
    height: fit-content;
    min-width: 175px;

    &-filler {
        width: 240px;
        height: 87px;
    }

    & > * + * {
        margin-top: 15px;
    }

    &__dmy {
        font-size: var(--fs-large);
        font-weight: var(--fw-normal-thiner);
    }

    &__day-time {
        display: flex;
        gap: 20px;
        align-items: center;
    }

    &__day,
    &__time {
        font-size: var(--fs-normal);
        font-weight: var(--fw-normal-thiner);
    }
}

@media screen and (min-width: 600px) {
    .current-date-info {
        &__dmy {
            font-weight: var(--fw-normal);
        }

        &__day,
        &__time {
            font-size: var(--fs-heading);
            font-weight: var(--fw-normal-thiner);
        }

        &-filler {
            width: 271px;
            height: 92px;
        }
    }
}
</style>
