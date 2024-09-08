import { UI } from './js/UI.js';
import { calculateDifference } from './js/eventHandlers.js';

UI.form.addEventListener('submit', calculateDifference);
