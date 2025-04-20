import TelegramBot from "node-telegram-bot-api";
import { getUser, updateTrackedCurrencyGoal } from "../../db/userActions";

// Step 1: Mostra lista delle valute
export const updateGoalHandler = async (chatId: string, bot: TelegramBot) => {
  const user = await getUser(chatId);

  if (!user || user.trackedCurrencies.length === 0) {
    await bot.sendMessage(chatId, "⚠️ Você não tem moedas registradas para atualizar.");
    return;
  }

  const inlineKeyboard = user.trackedCurrencies.map((tc) => [
    {
      text: `✏️ ${tc.currency.toUpperCase()}`,
      callback_data: `update_${tc.currency}`,
    },
  ]);

  await bot.sendMessage(chatId, "Selecione uma moeda para atualizar o objetivo:", {
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
  });
};

// Step 2: Salva lo stato in memoria e aspetta l’obiettivo
const waitingForGoalUpdate = new Map<string, string>(); // chatId -> currency

export const handleCurrencyToUpdate = async (
  currency: string,
  chatId: string,
  bot: TelegramBot
) => {
  waitingForGoalUpdate.set(chatId, currency);
  await bot.sendMessage(chatId, `📥 Envie o novo objetivo para *${currency.toUpperCase()}*`, {
    parse_mode: "Markdown",
  });
};

// Step 3: Riceve e aggiorna il goal
export const handleGoalInput = async (chatId: string, text: string, bot: TelegramBot) => {
  console.log(`🎯 handleGoalInput chiamato per ${chatId}, testo: ${text}`);

  const currency = waitingForGoalUpdate.get(chatId);
  console.log(`🔍 Currency in attesa per ${chatId}: ${currency}`);

  if (!currency) return;

  const newGoal = parseFloat(text);
  if (isNaN(newGoal)) {
    await bot.sendMessage(chatId, "❌ Por favor, envie um número válido.");
    return;
  }

  await updateTrackedCurrencyGoal(chatId, currency, newGoal);
  waitingForGoalUpdate.delete(chatId);

  await bot.sendMessage(chatId, `✅ Objetivo para ${currency.toUpperCase()} atualizado para ${newGoal}.`, {
    parse_mode: "Markdown",
  });
};

