//global state of the app
const measurementType = ref<"F" | "C">("C");

export const useMeasurement = () => {
    const measurement = computed(() => measurementType.value);

    const toggleMeasurement = () => {
        measurementType.value = measurementType.value === "C" ? "F" : "C";
    };

    return {
        toggleMeasurement,
        measurement,
    };
};
