import { format } from '../node_modules/date-fns/format.mjs';
import { ru } from '../node_modules/date-fns/locale/ru.mjs';

export function getCurrentTime() {
    return format(new Date(), 'd MMMM yyyy, HH:mm', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        locale: ru,
    });
}

export function showHtmlElement(element) {
    element.classList.remove('hidden');
}

export function hideHtmlElement(element) {
    element.classList.add('hidden');
}
