import { hideHtmlElement } from './helpers.js';

export class Modal {
    constructor() {
        this.modalShade = document.body.querySelector('.modal-shade');
        this.modal = document.body.querySelector('.modal');
        this.closeButton = document.body.querySelector('.modal__closeButton');
        this.modalForm = document.body.querySelector('.modal__form');
        this.modalSubmitButton = document.body.querySelector('.modal__submit-button');

        this.closeButton.addEventListener('click', () => {
            this.closeModal();
        });
        this.modalShade.addEventListener('click', () => {
            this.closeModal();
        });
    }

    closeModal() {
        hideHtmlElement(this.modalShade);
        hideHtmlElement(this.modal);
    }
}
