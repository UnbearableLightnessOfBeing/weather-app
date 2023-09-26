const base = "http://api.weatherapi.com/v1";
const apiKey = "f9c31516a55b4bd7ae0112903232509";

const endPoints = {
    current: "current.json",
};

export const getCurrentWeather = async (location: string) => {
    const response = await fetch(
        `${base}/${endPoints.current}?` +
            new URLSearchParams({
                key: apiKey,
                q: location,
                aqi: "no",
            }),
    );

    if (!response.ok) {
        throw new Error("ooops!");
    }

    return response.json();
};
