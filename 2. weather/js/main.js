import { UI } from './UI/UI.js';
import { localStorageManager } from './localStorageManager.js';
import { Location } from './locationConstructor.js';
import { initializePage } from './UI/UIBuilder.js';
import {
    getLocationInfoBySearch,
    showRemoveButtonOnRow,
    chooseFavoriteLocation,
    removeFavoriteLocationByRemoveButton,
    likeOrUnlikeLocation,
    convertTemperatureValue,
    getCurrentLocationInfoAndChooseIt,
} from './eventHandlers.js';

UI.SUBMIT_BUTTON.addEventListener('click', getLocationInfoBySearch);
UI.SEARCH_FORM.addEventListener('submit', getLocationInfoBySearch);

UI.FAVORITE_LIST.addEventListener('mouseover', showRemoveButtonOnRow);
UI.FAVORITE_LIST.addEventListener('click', chooseFavoriteLocation);
UI.FAVORITE_LIST.addEventListener('click', removeFavoriteLocationByRemoveButton);

UI.LIKE_BUTTON.addEventListener('click', likeOrUnlikeLocation);

UI.TEMPERATURE.addEventListener('click', convertTemperatureValue);

UI.USER_CURRENT_LOCATION_ICON.addEventListener('click', getCurrentLocationInfoAndChooseIt);

export const favoriteList = localStorageManager.getFavoritesData();
export const chosenLocation = new Location();
initializePage();
