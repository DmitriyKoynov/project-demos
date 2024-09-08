import { formatTemperature, formatTime } from '../utils.js';

export function parseWeatherInfo(weatherInfo) {
    return {
        location: weatherInfo.name,
        icon: weatherInfo.weather[0].icon,

        temperature: formatTemperature(weatherInfo.main.temp),
        feelsLike: formatTemperature(weatherInfo.main.feels_like),

        time: formatTime(weatherInfo.timezone, Date.now() / 1000),
        sunrise: formatTime(weatherInfo.timezone, weatherInfo.sys.sunrise),
        sunset: formatTime(weatherInfo.timezone, weatherInfo.sys.sunset)
    };
}
