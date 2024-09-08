import { getCurrentLocation } from './api/geolocationApi.js';
import { getLocationInfoFromServer } from './api/weatherApi.js';
import { localStorageManager } from './localStorageManager.js';
import { chosenLocation, favoriteList } from './main.js';
import { parseForecastInfo } from './parsers/forecastParser.js';
import { parseWeatherInfo } from './parsers/weatherParser.js';
import { UI } from './UI/UI.js';
import { createPage } from './UI/UIBuilder.js';
import { TEMPERATURE_MEASUREMENT_SYSTEMS } from './utils.js';

export function getLocationInfoBySearch(event) {
    event.preventDefault();
    const locationName = getSearchInputValue();
    updateChosenLocationPageInfo(locationName);
}
function getSearchInputValue() {
    return UI.SEARCH_INPUT.value;
}
export async function updateChosenLocationPageInfo(locationName) {
    try {
        const [weatherInfoFromServer, forecastInfoFromServer] = await getLocationInfoFromServer(
            locationName,
            chosenLocation.temperatureSystem,
        );
        chosenLocation.weather = parseWeatherInfo(weatherInfoFromServer);
        chosenLocation.forecast = parseForecastInfo(forecastInfoFromServer, chosenLocation.forecastElementsAmount);
        createPage(undefined, chosenLocation);
        window.Cookies.set('chosenLocation', locationName, { expires: 1 });
    } catch (error) {
        console.error(error);
    }
}

export function showRemoveButtonOnRow(event) {
    const hasLocationRowInParent = event.target.closest('.location-list-item');
    if (hasLocationRowInParent) {
        const locationRow = event.target.closest('.location-list-item');
        const removeButton = locationRow.querySelector('.removeButton');
        removeButton.style.display = 'block';
        locationRow.addEventListener('mouseleave', hideRemoveButton);
    }
}
function hideRemoveButton() {
    this.querySelector('.removeButton').style.display = 'none';
    this.removeEventListener('mouseleave', hideRemoveButton);
}

export function chooseFavoriteLocation(event) {
    const hasLocationRowInParent = event.target.closest('.location-list-item');
    const isNotRemoveButton = !event.target.classList.contains('removeButton');

    if (hasLocationRowInParent && isNotRemoveButton) {
        const locationRow = event.target.closest('.location-list-item');
        const locationName = locationRow.querySelector('.location').textContent;
        updateChosenLocationPageInfo(locationName);
    }
}
export function removeFavoriteLocationByRemoveButton(event) {
    const isRemoveButton = event.target.classList.contains('removeButton');
    if (isRemoveButton) {
        event.stopPropagation();
        const locationName = event.target.previousSibling.textContent;
        removeLocationFromFavoriteList(locationName);
        createPage(favoriteList);
    }
}

export function likeOrUnlikeLocation() {
    const locationName = chosenLocation.weather.location;
    const isFavoriteLocation = favoriteList.has(locationName);
    if (isFavoriteLocation) {
        removeLocationFromFavoriteList(locationName);
        createPage(favoriteList);
        return;
    }
    addLocationToFavoriteList(locationName);
    createPage(favoriteList);
}

function addLocationToFavoriteList(locationName) {
    favoriteList.add(locationName);
    localStorageManager.setFavoritesData(favoriteList);
    updateLikeButton();
    console.log(SUCCESS_MESSAGES.addSuccess(locationName));
}

function removeLocationFromFavoriteList(locationName) {
    favoriteList.delete(locationName);
    localStorageManager.setFavoritesData(favoriteList);
    updateLikeButton();
    console.log(SUCCESS_MESSAGES.removeSuccess(locationName));
}

const SUCCESS_MESSAGES = {
    addSuccess: location => `Локация '${location}' добавлена в список избранных`,
    removeSuccess: location => `Локация '${location}' удалена из списка избранных`,
};

export function convertTemperatureValue() {
    switch (chosenLocation.temperatureSystem) {
        case TEMPERATURE_MEASUREMENT_SYSTEMS.metric:
            chosenLocation.temperatureSystem = TEMPERATURE_MEASUREMENT_SYSTEMS.standard;
            break;
        case TEMPERATURE_MEASUREMENT_SYSTEMS.standard:
            chosenLocation.temperatureSystem = TEMPERATURE_MEASUREMENT_SYSTEMS.imperial;
            break;
        case TEMPERATURE_MEASUREMENT_SYSTEMS.imperial:
            chosenLocation.temperatureSystem = TEMPERATURE_MEASUREMENT_SYSTEMS.metric;
            break;
    }
    updateChosenLocationPageInfo(chosenLocation.weather.location);
}

export async function getCurrentLocationInfoAndChooseIt() {
    try {
        const currentLocation = await getCurrentLocation();
        return updateChosenLocationPageInfo(currentLocation);
    } catch (error) {
        console.error(error);
    }
}

export function updateLikeButton() {
    const isCurrentLocationFavorite = favoriteList.has(chosenLocation.weather.location);
    if (isCurrentLocationFavorite) {
        UI.LIKE_BUTTON.classList.add('like-button--liked');
    }
    if (!isCurrentLocationFavorite) {
        UI.LIKE_BUTTON.classList.remove('like-button--liked');
    }
}
