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
        :shown="isActive && Boolean(searchValue.length)"
        class="location-interface"
    >
        <template #default>
            <BasicSearch
                v-model="searchValue"
                :active="isActive"
                @update:active="(value) => (isActive = value)"
            />
            <Transition appear name="location">
                <div v-if="!isActive" class="location-interface__location">
                    <GeoLocationButton />
                    <div class="location-interface__location-name">
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
                            isActive = false;
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
    padding-inline: 20px;
    padding-block: 10px;

    &__location {
        display: flex;
        gap: 30px;
        align-items: center;

        &-name {
            font-size: var(--fs-large-smaller);
            font-weight: var(--fw-normal-thiner);
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
