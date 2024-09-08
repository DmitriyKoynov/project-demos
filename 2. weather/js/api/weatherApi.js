const WeatherServerInfo = {
    serverUrl: 'http://api.openweathermap.org/data/2.5',
    apiKey: 'f660a2fb1e4bad108d6160b7f58c555f'
};

export const REQUEST_TYPE = {
    WEATHER: 'weather',
    FORECAST: 'forecast'
};

export async function getLocationInfoFromServer(locationName, temperatureSystem) {
    const weatherApiUrl = `${WeatherServerInfo.serverUrl}/${REQUEST_TYPE.WEATHER}?q=${locationName}&units=${temperatureSystem.units}&appid=${WeatherServerInfo.apiKey}&lang=ru`;

    const forecastApiUrl = `${WeatherServerInfo.serverUrl}/${REQUEST_TYPE.FORECAST}?q=${locationName}&units=${temperatureSystem.units}&appid=${WeatherServerInfo.apiKey}&lang=ru`;

    try {
        const [weatherResponse, forecastResponse] = await Promise.all([fetch(weatherApiUrl), fetch(forecastApiUrl)]);
        if (!weatherResponse.ok || !forecastResponse.ok) {
            console.error(`Сервер ответил с ошибкой`);
        }
        const [weatherJson, forecastJson] = await Promise.all([weatherResponse.json(), forecastResponse.json()]);
        return [weatherJson, forecastJson];
    } catch (error) {
        console.error(error);
    }
}

export function getIconUrl(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
}
