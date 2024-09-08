import { calculateDifferenceBetweenDateAndNow } from './helpers.js';
import { getDateValue, setDifferenceValue } from './UI.js';

export function calculateDifference(event) {
    event.preventDefault();
    const date = getDateValue();
    const difference = calculateDifferenceBetweenDateAndNow(date);
    setDifferenceValue(difference);
}
