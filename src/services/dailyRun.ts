import TelegramBot from "node-telegram-bot-api";
import { getAllUsersWithTrackedCurrencies } from "./monitorCurrency";
import { getCurrencyRate } from "./currencyService";
import cron from "node-cron";

export const checkDailyCurrencyRates = async (bot: TelegramBot) => {
  const users = await getAllUsersWithTrackedCurrencies();
  for (const user of users) {
    if (user?.trackedCurrencies.length > 0) {
      for (const trackedCurrency of user.trackedCurrencies) {
        const { currency } = trackedCurrency;
        const currentRate = await getCurrencyRate(currency);
        await bot.sendMessage(
          user.chatId,
          `⏱️ Atualização diária: a taxa de câmbio de ${currency} hoje fechou em ${currentRate}! ⏱️`
        );
        await bot.sendMessage(
          user.chatId,
          `Cadastre-se no Wise usando este link, você apoiará o bot e terá vantagens na conversão! https://bit.ly/currencyTrackerBot`
        );
      }
    }
  }
};

export function scheduleDailyMonitoring(bot: TelegramBot) {
  cron.schedule('0 21 * * *', async () => {
    console.log('⏰ Avvio monitoramento giornaliero alle 21:00 ora italiana.');
    await checkDailyCurrencyRates(bot);
  }, {
    timezone: 'Europe/Rome'
  });
}
