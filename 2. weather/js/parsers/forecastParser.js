import { formatTemperature, formatTime } from '../utils.js';

export function parseForecastInfo(forecastInfo, forecastElementsAmount) {
    const forecast = [];
    for (let intervalIndex = 0; intervalIndex < forecastElementsAmount; intervalIndex++) {
        const weatherInfo = forecastInfo.list[intervalIndex];
        const weather = {
            time: formatTime(forecastInfo.city.timezone, weatherInfo.dt),
            temperature: formatTemperature(weatherInfo.main.temp),
            feelsLike: formatTemperature(weatherInfo.main.feels_like)
        };
        forecast.push(weather);
    }
    return forecast;
}
