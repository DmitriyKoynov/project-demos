export const UI = {
    form: document.body.querySelector('.form'),
    inputDate: document.body.querySelector('#date'),
    timeRemainingField: document.body.querySelector('.time-remaining_value'),
};
export function setDifferenceValue(value) {
    UI.timeRemainingField.textContent = value;
}
export function getDateValue() {
    return new Date(UI.inputDate.value);
}
