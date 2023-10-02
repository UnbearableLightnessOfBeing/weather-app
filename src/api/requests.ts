import axios from "axios";

const base = "http://api.weatherapi.com/v1";
const apiKey = "f9c31516a55b4bd7ae0112903232509";

const endPoints = {
    current: "/current.json",
    search: "/search.json",
};

const axiosInstance = axios.create({
    baseURL: base,
    params: {
        key: apiKey,
    },
});

export const getCurrentWeather = async (location: string) => {
    const response = await axiosInstance.get(endPoints.current, {
        params: {
            q: location,
            aqi: "yes",
        },
    });

    if (response.status === 200) {
        //test
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return response.data;
    } else {
        throw new Error("error has occured");
    }
};

export const getSearchResults = async (location: string) => {
    const response = await axiosInstance.get(endPoints.search, {
        params: {
            q: location,
        },
    });

    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error("error has occured");
    }
};
