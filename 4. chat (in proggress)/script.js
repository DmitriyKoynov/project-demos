import { ChatPage } from './js/chatPage.js';
import { User } from './js/user.js';

export const client = new User('Дмитрий Койнов');
export const interlocutor = new User('Арсен Ибрагимов');
export const chatPage = new ChatPage();
chatPage.init();
