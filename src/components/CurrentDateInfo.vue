<script setup lang="ts">
import dayNames from "../assets/date/dayNames.json";

type Language = "en" | "ru";

const props = defineProps<{
    language: Language;
    unixDate: Date;
}>();

const monthNames = computed(() => {
    if (props.language === "en") {
        return dayNames.en.full;
    } else return dayNames.ru.full;
});

const date = computed(() => props.unixDate.getDate());

const month = computed(() => {
    const monthName = props.unixDate.toLocaleString(props.language, {
        month: "long",
    });
    if (monthName.length <= 4) {
        return monthName;
    } else return monthName.slice(0, 3);
});

const year = computed(() => {
    const year = props.unixDate.getFullYear().toString();
    return `‘${year.slice(year.length - 2)}`;
});

const day = computed(() => monthNames.value[props.unixDate.getDay()]);

const time = computed(() => {
    const timeString = props.unixDate.toLocaleTimeString(props.language);
    const [time, dayPeriod] = timeString.split(" ");
    const splitTime = time.split(":");
    return (
        splitTime[0] + ":" + splitTime[1] + (dayPeriod ? ` ${dayPeriod}` : "")
    );
});
</script>

<template>
    <div class="current-date-info">
        <div class="current-date-info__dmy">
            {{ date }} {{ month }} {{ year }}
        </div>
        <div class="current-date-info__day-time">
            <div class="current-date-info__day">
                {{ day }}
            </div>
            <BasicVerticalDivider />
            <div class="current-date-info__time">
                {{ time }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.current-date-info {
    width: fit-content;
    height: fit-content;

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
    }
}
</style>
