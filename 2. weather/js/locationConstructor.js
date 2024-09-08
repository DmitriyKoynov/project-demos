import { TEMPERATURE_MEASUREMENT_SYSTEMS } from './utils.js';

export function Location() {
    this.weather = {};
    this.forecast = [];
    this.forecastElementsAmount = 5;
    this.temperatureSystem = TEMPERATURE_MEASUREMENT_SYSTEMS.metric;
    this.isFavorite = false;
}
