<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getSearchResults } from "../api/requests";

defineProps<{
    modelValue: string;
}>();

defineEmits<{
    //eslint-disable-next-line
    (e: "update:modelValue", vlaue: string): void;
}>();

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
    error,
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
</script>

<template>
    <VDropdown
        :theme="'custom-dropdown'"
        :disabled="!isActive"
        :shown="isSearchActive && Boolean(searchValue.length)"
        class="location-interface"
    >
        <template #default>
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
        </template>
        <template #popper>
            <ItemListWrapper v-if="isFetching">
                <BasicSearchMessage message="Loading..." />
            </ItemListWrapper>
            <ItemListWrapper v-else-if="searchData && searchData.length">
                <BasicLocationItem
                    v-for="item in searchData"
                    :key="item.id"
                    :city="item.name"
                    :country="item.country"
                    @update:location="
                        (value) => {
                            $emit('update:modelValue', value);
                            // isActive = false;
                            isSearchActive = false;
                        }
                    "
                />
            </ItemListWrapper>
            <ItemListWrapper v-else-if="!isError">
                <BasicSearchMessage message="Nothing was found" />
            </ItemListWrapper>
            <ItemListWrapper v-else>
                <BasicSearchMessage
                    type="error"
                    :message="(<Error>error).message"
                />
            </ItemListWrapper>
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
}

@media screen and (min-width: 600px) {
    .location-interface {
        &__location {
            gap: 30px;

            &-name {
                font-size: var(--fs-large-smaller);
            }
        }
    }
}

@media screen and (min-width: 1440px) {
    .location-interface {
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
