import TelegramBot from "node-telegram-bot-api";
import { User } from "../models/User";
import { getCurrencyRate } from "./currencyService";

export const monitorCurrencyRates = async (bot: TelegramBot) => {
  const users = await getAllUsersWithTrackedCurrencies();

  for (const user of users) {
    if (user?.trackedCurrencies.length > 0) {
      for (const trackedCurrency of user.trackedCurrencies) {
        const { currency, goal } = trackedCurrency;
        const currentRate = await getCurrencyRate(currency);

        if (currentRate < goal) {
          bot.sendMessage(
            user.chatId,
            `⚠️⚠️⚠️⚠️⚠️ Atenção! A taxa de câmbio de ${currency} caiu abaixo da sua meta de ${goal}. Taxa atual: ${currentRate}. ⚠️⚠️⚠️⚠️⚠️`
          );
        }
      }
    }
  }
};



export const getAllUsersWithTrackedCurrencies = async () => {
  try {
    const users = await User.find({ "trackedCurrencies.0": { $exists: true } });
    return users;
  } catch (error) {
    console.error("❌ Error retrieving users with tracked currencies:", error);
    return [];
  }
};
