import TelegramBot, { Message } from "node-telegram-bot-api";
import { User } from "../../models/User";

export const addTrackingHandler = async (bot: TelegramBot) => {
  bot.on("callback_query", async (query) => {
    const chatId = query.message?.chat.id.toString();
    const data = query.data;
  
    if (!chatId || !data) return;
  
    if (data === "add_tracking") {
      // Quando preme "Add Tracking", mostra tastiera delle valute
      const inlineKeyboard = {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "USD 🇺🇸", callback_data: "currency_USD" },
              { text: "EUR 🇪🇺", callback_data: "currency_EUR" },
            ],
            [
              { text: "JPY 🇯🇵", callback_data: "currency_JPY" },
              { text: "CNY 🇨🇳", callback_data: "currency_CNY" },
            ],
            [
              { text: "GBP 🇬🇧", callback_data: "currency_GBP" },
              { text: "AUD 🇦🇺", callback_data: "currency_AUD" },
            ],
          ],
        },
      };
  
      bot.sendMessage(chatId, "Choose a Currency:", inlineKeyboard);
    }
  
    if (data.startsWith("currency_")) {
      // Quando preme una valuta
      const currency = data.split("_")[1]; // Esempio: USD
      bot.sendMessage(chatId, `Great, you chose: ${currency}!`);
    }
  
    await bot.answerCallbackQuery(query.id);
  });  
};
