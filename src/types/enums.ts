type GetEnumOptions<T> = {
    [P in keyof T]: T[P];
}[keyof T];

export const Theme = {
    STANDARD: "standard",
    SUNSET: "sunset",
    SEA: "sea",
    MEADOW: "meadow",
    OCEAN: "ocean",
    SUMMER: "summer",
    NEON: "neon",
} as const;

export type ThemeType = GetEnumOptions<typeof Theme>;
