export type LocationType = {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
};

export type WeatherCondition = {
    text: string;
    code: number;
};

export type AirQuality = {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    "us-epa-index": number;
    "gb-defra-index": number;
};

export type CurrentWeather = {
    temp_c: number;
    temp_f: number;
    is_day: 0 | 1;
    condition: WeatherCondition;
    wind_dir: string;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
    air_quality: AirQuality;
};

export type GetCurrentWeatherResponse = {
    location: LocationType;
    current: CurrentWeather;
};
