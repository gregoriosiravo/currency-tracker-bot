import TelegramBot from "node-telegram-bot-api";
import { currencyKeyboard } from "../keyboards/currencyKeyboard";
import { addTrackingHandler } from "./addTrackingHandler";

export const callbackQueryHandler = (bot: TelegramBot) => {
  bot.on("callback_query", async (query) => {
    const chatId = query.message?.chat.id.toString();
    const data = query.data;

    if (!chatId || !data) return;

    if (data === "add_tracking") {
      // L'utente vuole aggiungere un tracking
      bot.sendMessage(chatId, "Choose a currency:", currencyKeyboard);
    } else if (data.startsWith("currency_")) {
      const currency = data.split("_")[1];
      addTrackingHandler(currency, chatId, bot);
    } else if (data === "update_goal") {
      bot.sendMessage(chatId, "🛠️ Update Goal - Coming soon!");
    } else if (data === "delete_tracking") {
      bot.sendMessage(chatId, "🗑️ Delete Tracking - Coming soon!");
    }

    await bot.answerCallbackQuery(query.id);
  });
};
