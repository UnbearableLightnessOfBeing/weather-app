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

export type DailyWeather = {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: WeatherCondition;
    uv: number;
    air_quality: AirQuality;
};

export type AstronomyType = {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
    is_moon_up: number;
    is_sun_up: number;
};

export type DailyForecast = {
    date: string;
    date_epoch: number;
    day: DailyWeather;
    astro: AstronomyType;
    hour: any[];
};

export type ForecastType = {
    forecastday: DailyForecast[];
};

export type GetForecastResponse = {
    location: LocationType;
    current: CurrentWeather;
    forecast: ForecastType;
};
