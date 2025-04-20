import TelegramBot from "node-telegram-bot-api";
import { getUser, removeTrackedCurrency } from "../../db/userActions";

export const deleteTrackingHandler = async (chatId: string, bot: TelegramBot) => {
  const user = await getUser(chatId);

  if (!user || user.trackedCurrencies.length === 0) {
    await bot.sendMessage(chatId, "⚠️ Você não tem moedas registradas para excluir.");
    return;
  }

  const inlineKeyboard = user.trackedCurrencies.map((tc) => [
    {
      text: `❌ ${tc.currency.toUpperCase()}`,
      callback_data: `delete_${tc.currency}`,
    },
  ]);

  await bot.sendMessage(chatId, "Selecione uma moeda para excluir:", {
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
  await bot.sendMessage(chatId, `✅ ${currency.toUpperCase()} foi removida dos seus registros.`);
};
