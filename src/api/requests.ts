import axios from "axios";
import { GetForecastResponse } from "../types/requestTypes";

const base = "http://api.weatherapi.com/v1";
const apiKey = "f9c31516a55b4bd7ae0112903232509";

const endPoints = {
    current: "/current.json",
    search: "/search.json",
    forecast: "/forecast.json",
};

const axiosInstance = axios.create({
    baseURL: base,
    params: {
        key: apiKey,
    },
});

export const getCurrentWeather = async (
    location: string,
    lang: "en" | "ru",
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

    //test
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    return response.data;
};

export const getSearchResults = async (location: string) => {
    const response = await axiosInstance
        .get(endPoints.search, {
            params: {
                q: location,
            },
        })
        .catch(() => {
            throw new Error("error has occured");
        });

    return response.data;
};
