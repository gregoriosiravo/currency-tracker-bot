import TelegramBot from "node-telegram-bot-api";
import { getUser } from "../../db/userActions";

export const listTrackingHandler = async (chatId: string, bot: TelegramBot) => {
  const user = await getUser(chatId);

  if (!user || user.trackedCurrencies.length === 0) {
    await bot.sendMessage(chatId, "⚠️  Você não tem moedas registradas!");
    return;
  }

  const message = user.trackedCurrencies
    .map((tc) => `💱 *${tc.currency.toUpperCase()}* - 🎯 Goal: ${tc.goal}`)
    .join("\n");

  await bot.sendMessage(chatId, `📊 Suas moedas registradas:\n\n${message}`, {
    parse_mode: "Markdown",
  });
};
