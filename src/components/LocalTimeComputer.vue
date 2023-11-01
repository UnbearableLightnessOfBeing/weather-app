<script setup lang="ts">
const props = defineProps<{
    localtime?: string;
    isLoading?: boolean;
}>();

const unixCurrentDate = ref<Date | undefined>(undefined);

const setDate = (diffInHours: number) => {
    unixCurrentDate.value = new Date(
        new Date().getTime() - diffInHours * 60 * 60 * 1000,
    );
};

let interval: NodeJS.Timeout;

const setUnixCurrentDate = () => {
    if (props.localtime) {
        const localTime = new Date(props.localtime).getTime();
        const now = new Date().getTime();
        const diffInHours = Math.round((now - localTime) / (1000 * 60 * 60));
        setDate(diffInHours);
        interval = setInterval(() => {
            setDate(diffInHours);
        }, 1000);
    }
};

watch(
    () => props.isLoading,
    () => {
        clearInterval(interval);
        setUnixCurrentDate();
    },
);

onMounted(() => {
    setUnixCurrentDate();
});

onUnmounted(() => {
    clearInterval(interval);
});

defineExpose({
    unixCurrentDate,
});
</script>

<template>
    <div class="local-time-computer">
        <slot :current-date="unixCurrentDate" />
    </div>
</template>

<style scoped></style>
