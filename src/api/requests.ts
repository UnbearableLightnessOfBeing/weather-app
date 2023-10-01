const base = "http://api.weatherapi.com/v1";
const apiKey = "f9c31516a55b4bd7ae0112903232509";

const endPoints = {
    current: "current.json",
    search: "search.json",
};

export const getCurrentWeather = async (location: string) => {
    const response = await fetch(
        `${base}/${endPoints.current}?` +
            new URLSearchParams({
                key: apiKey,
                q: location,
                aqi: "yes",
            })
    );

    if (!response.ok) {
        throw new Error("ooops!");
    }

    const data = response.json();
    console.log(data);

    return data;
};

export const getSearchResults = async (location: string) => {
    const response = await fetch(
        `${base}123/${endPoints.search}?` +
            new URLSearchParams({
                key: apiKey,
                q: location,
            })
    );

    if (!response.ok) {
        throw new Error("Error has occured during search");
    }

    const data = response.json();
    console.log(data);

    return data;
};
