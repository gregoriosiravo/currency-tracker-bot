import TelegramBot from "node-telegram-bot-api";
import { getUser, removeTrackedCurrency } from "../../db/userActions";

export const deleteTrackingHandler = async (chatId: string, bot: TelegramBot) => {
  const user = await getUser(chatId);

  if (!user || user.trackedCurrencies.length === 0) {
    await bot.sendMessage(chatId, "⚠️ You have no tracked currencies to delete.");
    return;
  }

  const inlineKeyboard = user.trackedCurrencies.map((tc) => [
    {
      text: `❌ ${tc.currency.toUpperCase()}`,
      callback_data: `delete_${tc.currency}`,
    },
  ]);

  await bot.sendMessage(chatId, "Select a currency to delete:", {
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
  });
};

export const handleCurrencyDeletion = async (
  currency: string,
  chatId: string,
  bot: TelegramBot
) => {
  await removeTrackedCurrency(chatId, currency);
  await bot.sendMessage(chatId, `✅ ${currency.toUpperCase()} has been removed from your trackings.`);
};
