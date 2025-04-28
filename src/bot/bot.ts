import TelegramBot from "node-telegram-bot-api";
import { startCommand } from "./commands/startCommand";
import { optionCommand } from "./commands/optionCommand";
import { callbackQueryHandler } from "./handlers/callbackQueryHandler";
import { handleGoalInput } from "./handlers/updateGoalHandler";
import dotenv from "dotenv";
import { monitorCurrencyRates } from "../services/monitorCurrency";
import { scheduleDailyMonitoring } from "../services/dailyRun";

dotenv.config();

export const startBot = () => {
  const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || "", {
    polling: true,
  });

  startCommand(bot);
  optionCommand(bot);

  callbackQueryHandler(bot);

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id.toString();
    const text = msg.text;

    if (!text) return;

    await handleGoalInput(chatId, text, bot);
  });
  scheduleDailyMonitoring(bot);
  setInterval(async () => {
    await monitorCurrencyRates(bot);
  }, 10 * 60 * 1000);
};
