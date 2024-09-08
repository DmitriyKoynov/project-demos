import { chatPage, client } from '../script.js';
import { Modal } from './modal.js';

export class SettingsModal extends Modal {
    constructor() {
        super();
        this.nameSettingInput = document.body.querySelector('.name-setting__input');
    }

    init() {
        this.nameSettingInput.value = client.name;

        this.modalForm.addEventListener('submit', event => {
            event.preventDefault();
            try {
                if (!this.nameSettingInput.value.trim().length) {
                    throw new Error('Попытка незаконного изменения HTML');
                }
                this.closeModal();
                if (client.name !== this.nameSettingInput.value) {
                    client.name = this.nameSettingInput.value;
                    chatPage.updateNamesInChat();
                }
            } catch (error) {
                console.error(error);
            }
        });
    }
}
