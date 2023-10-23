import axios from "axios";
import {
    GetForecastResponse,
    LocationSearchResultType,
    LocationType,
} from "../types/requestTypes";
import type { LanguageName } from "../composables/useLocale";

const base = "https://api.weatherapi.com/v1";
const apiKey = "f9c31516a55b4bd7ae0112903232509";

const endPoints = {
    current: "/current.json",
    search: "/search.json",
    forecast: "/forecast.json",
    timezone: "/timezone.json",
};

const axiosInstance = axios.create({
    baseURL: base,
    params: {
        key: apiKey,
    },
});

export const getCurrentWeather = async (
    location: string,
    lang: LanguageName,
) => {
    const response = await axiosInstance
        .get<GetForecastResponse>(endPoints.forecast, {
            params: {
                q: location,
                days: 7,
                aqi: "yes",
                alerts: "no",
                lang: lang !== "en" ? lang : "",
            },
        })
        .catch(() => {
            throw new Error("error has occured");
        });

    return response.data;
};

export const getSearchResults = async (location: string) => {
    const response = await axiosInstance
        .get<LocationSearchResultType[]>(endPoints.search, {
            params: {
                q: location,
            },
        })
        .catch(() => {
            throw new Error("error has occured");
        });

    return response.data;
};

export const getCurrentLocation = async (
    latitude: number,
    longitude: number,
) => {
    const response = await axiosInstance
        .get<{
            location: LocationType;
        }>(endPoints.timezone, {
            params: {
                q: `${latitude},${longitude}`,
            },
        })
        .catch(() => {
            throw new Error("error has occured");
        });

    return response.data;
};
