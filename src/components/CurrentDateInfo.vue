<script setup lang="ts">
import dayNames from "../assets/date/dayNames.json";
import type { LanguageName } from "../composables/useLocale";
import { LocaleNameEnum } from "../configs/i18nConfig";

const props = defineProps<{
    language: LanguageName;
    unixDate?: Date;
    timeHidden?: boolean;
    isLoading?: boolean;
}>();

const computedDayNames = computed(() =>
    props.language === LocaleNameEnum.Ru ? dayNames.ru.full : dayNames.en.full,
);

const date = computed(() =>
    props.unixDate ? props.unixDate.getDate() : undefined,
);

const shortenMonthName = (monthName: string) => {
    if (monthName.length <= 4) {
        return monthName;
    } else return monthName.slice(0, 3);
};

const month = computed(() => {
    if (props.unixDate) {
        const monthName = props.unixDate.toLocaleString(props.language, {
            month: "long",
        });

        return shortenMonthName(monthName);
    }
});

const year = computed(() => {
    if (props.unixDate) {
        const year = props.unixDate.getFullYear().toString();
        return `‘${year.slice(year.length - 2)}`;
    }
});

const day = computed(() => {
    if (props.unixDate) {
        return computedDayNames.value[props.unixDate.getDay()];
    }
});

const time = computed(() => {
    if (props.unixDate) {
        const timeString = props.unixDate.toLocaleTimeString(props.language);
        const [time, dayPeriod] = timeString.split(" ");
        const [hours, minutes] = time.split(":");
        return hours + ":" + minutes + (dayPeriod ? ` ${dayPeriod}` : "");
    }
});

defineExpose({
    date,
    month,
    year,
    day,
    time,
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
