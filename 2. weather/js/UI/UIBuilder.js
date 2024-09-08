import { getCurrentLocationInfoAndChooseIt, updateChosenLocationPageInfo, updateLikeButton } from '../eventHandlers.js';
import { favoriteList } from '../main.js';
import { UI } from './UI.js';

function updateWeatherElements(weather) {
    if (!weather) return;
    UI.CHOSEN_LOCATION.textContent = weather.location;
    UI.WEATHER_ICON.src = getWeatherIconSrc(weather);

    UI.TEMPERATURE.textContent = weather.temperature;
    UI.FEELS_LIKE.textContent = weather.feelsLike;

    UI.TIME.textContent = weather.time;
    UI.SUNRISE.textContent = weather.sunrise;
    UI.SUNSET.textContent = weather.sunset;
}

function getWeatherIconSrc(weather) {
    if (!weather.icon) {
        return '../../icons/weatherIcons/empty.gif';
    }
    const iconPath = `../../icons/weatherIcons/${weather.icon}.svg`;
    return iconPath;
}

export function updateForecastElements(forecast) {
    clearForecastContainer();
    for (let intervalIndex = 0; intervalIndex < forecast.length; intervalIndex++) {
        const forecastElement = createForecastElement(forecast[intervalIndex]);
        UI.FORECAST_ELEMENTS_CONTAINER.append(forecastElement);
    }
}

function createForecastElement(weather) {
    const divContainer = document.createElement('div');
    const timeElement = document.createElement('p');
    const temperatureElement = document.createElement('p');
    const feelsLikeElement = document.createElement('p');

    divContainer.classList.add('forecast-container');
    timeElement.classList.add('forecast-time', 'forecast-element', 'bold-text');
    temperatureElement.classList.add('forecast-temperature', 'forecast-element');
    feelsLikeElement.classList.add('forecast-feels-like', 'forecast-element');

    timeElement.textContent = weather.time;
    temperatureElement.textContent = 'Температура: ' + weather.temperature;
    feelsLikeElement.textContent = 'Ощущается: ' + weather.feelsLike;

    divContainer.append(timeElement, temperatureElement, feelsLikeElement);
    return divContainer;
}

export function clearForecastContainer() {
    UI.FORECAST_ELEMENTS_CONTAINER.textContent = '';
}

function updateFavoriteListElements(favoriteList) {
    if (!favoriteList) return;
    clearFavoriteLocationsList();
    favoriteList.forEach(favoriteLocation => {
        const li = document.createElement('li');
        const p = document.createElement('p');
        const removeButton = document.createElement('button');

        li.classList.add('location-list-item');
        p.classList.add('body-text', 'location');
        removeButton.type = 'button';
        removeButton.classList.add('removeButton');
        removeButton.style.display = 'none';

        p.textContent = favoriteLocation;

        li.append(p, removeButton);
        UI.FAVORITE_LIST.append(li);
    });
}

export function clearFavoriteLocationsList() {
    UI.FAVORITE_LIST.textContent = '';
}

export function createPage(favoriteList, chosenLocation) {
    if (favoriteList) updateFavoriteListElements(favoriteList);
    if (chosenLocation) {
        updateWeatherElements(chosenLocation.weather);
        updateForecastElements(chosenLocation.forecast);
    }
    updateLikeButton();
}
export async function initializePage() {
    try {
        if (window.Cookies.get('chosenLocation')) {
            updateChosenLocationPageInfo(window.Cookies.get('chosenLocation'));
        } else {
            await getCurrentLocationInfoAndChooseIt();
        }
        createPage(favoriteList);
    } catch (error) {
        console.error(error);
    }
}
