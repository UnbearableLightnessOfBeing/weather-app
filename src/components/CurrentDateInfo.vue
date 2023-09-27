<script setup lang="ts">
import dayNames from "../assets/date/dayNames.json";

type Language = "en" | "ru";

const props = defineProps<{
    language: Language;
    unixDate: Date;
}>();

const monthNames = computed(() => {
    if (props.language === "en") {
        return dayNames.en;
    } else return dayNames.ru;
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

const time = computed(() => props.unixDate.toLocaleTimeString(props.language));
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
        font-weight: var(--fw-normal);
    }

    &__day-time {
        font-size: var(--fs-heading);
        font-weight: var(--fw-normal-thiner);
        display: flex;
        gap: 20px;
        align-items: center;
    }
}
</style>
