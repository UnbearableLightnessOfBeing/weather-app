import { expect, describe, it } from "vitest";
import { useMeasurement } from "./useMeasurement";
import type { ComputedRef } from "vue";

describe("testing useMeasurement composable", () => {
    const { measurement, toggleMeasurement } = useMeasurement();

    it("is always a computed ref of F or C", () => {
        expect(measurement).toBe<ComputedRef<"F" | "C">>;
    });

    it("equals to C on the first access w/o toggling", () => {
        expect(measurement.value).toBe("C");
    });

    it("switches the value after toggling", () => {
        toggleMeasurement();
        expect(measurement.value).toBe("F");
        toggleMeasurement();
        expect(measurement.value).toBe("C");
    });
});
