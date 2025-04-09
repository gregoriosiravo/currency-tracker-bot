import TelegramBot, { Message } from 'node-telegram-bot-api';
import { User } from '../../models/User';

export const startHandler = (bot: TelegramBot) => {
  bot.onText(/\/start/, async (msg: Message) => {
    const chatId = msg.chat.id.toString();
    await bot.sendMessage(chatId, 'Welcome to Currency Tracker Bot! This bot will help you tracking exchange between a currency and BRL stocazzose, to use write: /options');
  });
};