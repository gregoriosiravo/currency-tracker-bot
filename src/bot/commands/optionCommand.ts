import TelegramBot from "node-telegram-bot-api";
import { mainMenuKeyboard } from "../keyboards/mainMenuKeyboard";

export const optionCommand = (bot: TelegramBot) => {
  bot.onText(/\/option/, (msg) => {
    bot.sendMessage(msg.chat.id, "Escolha uma opção:", mainMenuKeyboard);
  });
};
