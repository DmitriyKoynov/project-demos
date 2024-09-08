import { chosenLocation } from './main.js';

export const TEMPERATURE_MEASUREMENT_SYSTEMS = {
    standard: { units: 'standard', temperatureSign: '°K' },
    metric: { units: 'metric', temperatureSign: '°C' },
    imperial: { units: 'imperial', temperatureSign: '°F' }
};

export function formatTemperature(temperature) {
    return Math.round(temperature) + chosenLocation.temperatureSystem.temperatureSign;
}

export function formatTime(timezone, timestamp) {
    const time = new Date(timestamp * 1000 + timezone * 1000);
    return getConvenientTimeInCurrentZone(time);
}

function getConvenientTimeInCurrentZone(date) {
    const currentUTCHours = date.getUTCHours();
    const currentUTCMinutes = date.getMinutes();

    const hours = currentUTCHours < 10 ? '0' + currentUTCHours : currentUTCHours;
    const minutes = currentUTCMinutes < 10 ? '0' + currentUTCMinutes : currentUTCMinutes;

    return `${hours}:${minutes}`;
}
