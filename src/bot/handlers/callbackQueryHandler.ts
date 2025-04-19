import TelegramBot from "node-telegram-bot-api";
import { currencyKeyboard } from "../keyboards/currencyKeyboard";
import { addTrackingHandler } from "./addTrackingHandler";
import { listTrackingHandler } from "./listTrackingHandler";
import { deleteTrackingHandler, handleCurrencyDeletion} from "./deleteTrackingHandler";
import { updateGoalHandler, handleCurrencyToUpdate } from "./updateGoalHandler";

export const callbackQueryHandler = (bot: TelegramBot) => {
  bot.on("callback_query", async (query) => {
    const chatId = query.message?.chat.id.toString();
    const data = query.data;

    if (!chatId || !data) return;

    if (data === "add_tracking") {
      bot.sendMessage(chatId, "Choose a currency:", currencyKeyboard);
    } else if (data.startsWith("currency_")) {
      const currency = data.split("_")[1];
      addTrackingHandler(currency, chatId, bot);
    }  else if (data === "update_goal") {
      await updateGoalHandler(chatId, bot);
    } else if (data.startsWith("update_")) {
      const currency = data.split("_")[1];
      await handleCurrencyToUpdate(currency, chatId, bot);
    } else if (data === "delete_tracking") {
      await deleteTrackingHandler(chatId, bot);
    } else if (data.startsWith("delete_")) {
      const currency = data.split("_")[1];
      await handleCurrencyDeletion(currency, chatId, bot);
    } else if (data === "list_trackings") {
      await listTrackingHandler(chatId, bot);
    }

    await bot.answerCallbackQuery(query.id);
  });
};
