import { client, interlocutor } from '../script.js';
import { getCurrentTime, showHtmlElement } from './helpers.js';
import { SettingsModal } from './settingsModal.js';

export class ChatPage {
    constructor() {
        (this.settingsButton = document.body.querySelector('.settings-button')),
            (this.exitButton = document.body.querySelector('.exit-button')),
            (this.chat = document.body.querySelector('.chat-area')),
            (this.messageForm = document.body.querySelector('.input-message-form')),
            (this.clientMessageTemplate = document.body.querySelector('.client-message-template')),
            (this.interlocutorMessageTemplate = document.body.querySelector('.interlocutor-message-template')),
            (this.messageInput = document.body.querySelector('.input-message-form__input')),
            (this.sendButton = document.body.querySelector('.input-message-form__submit')),
            (this.modalShade = document.body.querySelector('.modal-shade')),
            (this.settingsModal = document.body.querySelector('.settings-modal'));
    }

    init() {
        this.updateNamesInChat();
        this.sendButton.disabled = this.messageInputIsEmpty();

        this.settingsButton.addEventListener('click', () => {
            showHtmlElement(this.modalShade);
            showHtmlElement(this.settingsModal);
            const settingsModal = new SettingsModal();
            settingsModal.init();
        });

        this.messageForm.addEventListener('submit', event => {
            event.preventDefault();
            if (this.messageInputIsEmpty()) return;
            this.sendMessage(client.name);
            this.messageInput.focus();
        });

        this.messageInput.addEventListener('input', () => {
            this.sendButton.disabled = this.messageInputIsEmpty();
        });
    }

    sendMessage(name, messageText = this.messageInput.value) {
        const messageTemplate = name === client.name ? this.clientMessageTemplate : this.interlocutorMessageTemplate;
        const message = messageTemplate.content.cloneNode(true);

        message.querySelector('.message__sender').textContent = name;
        message.querySelector('.message__text').textContent = messageText;
        message.querySelector('.message__time').textContent = getCurrentTime();

        this.chat.append(message);
        this.clearMessageInput();
        this.scrollChatToLastMessage();
    }

    clearMessageInput() {
        this.messageInput.value = '';
        this.disableSendButton();
    }

    scrollChatToLastMessage() {
        this.chat.scrollTop = this.chat.scrollHeight;
    }

    updateNamesInChat() {
        const clientMessages = this.chat.querySelectorAll('.message--client');
        const interlocutorMessages = this.chat.querySelectorAll('.message--interlocutor');

        clientMessages.forEach(message => {
            message.querySelector('.message__sender').textContent = client.name;
        });
        interlocutorMessages.forEach(message => {
            message.querySelector('.message__sender').textContent = interlocutor.name;
        });
    }

    messageInputIsEmpty() {
        return !this.messageInput.value.trim().length;
    }

    disableSendButton() {
        this.sendButton.disabled = true;
    }
}
