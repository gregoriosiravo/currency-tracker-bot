import TelegramBot from "node-telegram-bot-api";
import { startHandler } from "./handlers/start";
import { setGoalHandler } from "./handlers/setGoal";
import { deleteTrackingHandler } from "./handlers/deleteTracking";
import { updateGoalHandler } from "./handlers/updateGoal";
import { addTrackingHandler } from "./handlers/addTracking";
import { User } from "../models/User";
import { getCurrencyRate } from "../services/currencyService";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || "", {
  polling: true,
});

// Register handlers
startHandler(bot);
setGoalHandler(bot);
deleteTrackingHandler(bot);
updateGoalHandler(bot);
addTrackingHandler(bot);

export const startAlertCheck = () => {
  setInterval(async () => {
    const users = await User.find();
    users.forEach(async (user) => {
      user.trackedCurrencies.forEach(async (tracked) => {
        const rate = await getCurrencyRate(tracked.currency);
        if (rate <= tracked.goal) {
          bot.sendMessage(
            user.chatId,
            `🚨 GOOOOOAAAALLLLL! ${tracked.currency} reached BRL ${rate}`
          );
        }
      });
    });
  }, 60000);
};

export default bot;
