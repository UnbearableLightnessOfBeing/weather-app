<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getSearchResults } from "../api/requests";
import { useI18n } from "vue-i18n";

const props = defineProps<{
    modelValue: string;
}>();

const emits = defineEmits<{
    // eslint-disable-next-line
    (e: "update:modelValue", vlaue: string): void;
}>();

const writableComputed = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits("update:modelValue", value);
        isSearchActive.value = false;
    },
});

const { t } = useI18n();

const isActive = ref(false);

const isSearchActive = ref(false);

watch(isActive, () => {
    if (isActive.value) {
        setTimeout(() => {
            isSearchActive.value = true;
        }, 300);
    }
});

watch(isSearchActive, () => {
    if (!isSearchActive.value) {
        setTimeout(() => {
            isActive.value = false;
        }, 300);
    }
});

const searchValue = ref("");

const {
    data: searchData,
    isFetching,
    refetch,
    isError,
} = useQuery({
    queryKey: ["search", searchValue],
    queryFn: () => getSearchResults(searchValue.value),
    refetchOnWindowFocus: false,
    enabled: false,
});

watch(searchValue, () => {
    if (searchValue.value.length) {
        refetch();
    }
});

const search = ref<HTMLElement | null>(null);

const inputWidth = computed(() => {
    if (search.value) {
        return search.value.getBoundingClientRect().width;
    } else return 450;
});
</script>

<template>
    <VDropdown
        :theme="'custom-dropdown'"
        :disabled="!isActive"
        :shown="isSearchActive && Boolean(searchValue.length)"
    >
        <template #default>
            <div ref="search" class="location-interface">
                <BasicSearch
                    v-model="searchValue"
                    v-model:is-search-active="isSearchActive"
                    :active="isActive"
                    @update:active="(value) => (isActive = value)"
                />
                <Transition appear name="location">
                    <div v-if="!isActive" class="location-interface__location">
                        <GeoLocationButton
                            @update:location="
                                (value) => $emit('update:modelValue', value)
                            "
                        />
                        <div
                            v-tooltip="{
                                content: modelValue,
                                theme: 'custom-tooltip',
                            }"
                            class="location-interface__location-name"
                        >
                            {{ modelValue }}
                        </div>
                    </div>
                </Transition>
            </div>
        </template>
        <template #popper>
            <BasicSearchMessage
                v-if="isFetching"
                type="loading"
                :width="inputWidth"
            >
                <BasicSpinner />
            </BasicSearchMessage>
            <div
                v-else-if="searchData && searchData.length"
                :style="`width: ${inputWidth}px`"
            >
                <BasicLocationItem
                    v-for="item in searchData"
                    :key="item.id"
                    v-model:location="writableComputed"
                    :city="item.name"
                    :country="item.country"
                />
            </div>
            <BasicSearchMessage
                v-else-if="!isError"
                :message="t('search.notFound')"
                :width="inputWidth"
            />
            <BasicSearchMessage
                v-else
                type="error"
                :message="t('errors.searchError')"
                :width="inputWidth"
            />
        </template>
    </VDropdown>
</template>
<style scoped lang="scss">
.location-interface {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;

    &__location {
        display: flex;
        gap: 10px;
        align-items: center;

        &-name {
            font-size: var(--fs-normal);
            font-weight: var(--fw-normal-thiner);
        }
    }

    @media screen and (min-width: 600px) {
        &__location {
            gap: 30px;

            &-name {
                font-size: var(--fs-large-smaller);
            }
        }
    }

    @media screen and (min-width: 1440px) {
        &__location-name {
            max-width: 319px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
