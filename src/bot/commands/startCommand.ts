import TelegramBot from "node-telegram-bot-api";
import { mainMenuKeyboard } from "../keyboards/mainMenuKeyboard";

export const startCommand = (bot: TelegramBot) => {
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome! 👋", mainMenuKeyboard);
  });
};
