import { formatDuration } from '../node_modules/date-fns/formatDuration.mjs';
import { intervalToDuration } from '../node_modules/date-fns/intervalToDuration.mjs';
import { ru } from '../node_modules/date-fns/locale/ru.mjs';

export function calculateDifferenceBetweenDateAndNow(date) {
    const interval = intervalToDuration({
        start: new Date(),
        end: date,
    });
    return formatDuration(interval, {
        format: ['years', 'months', 'days', 'hours', 'minutes'],
        locale: ru,
    });
}
