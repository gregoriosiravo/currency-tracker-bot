import TelegramBot from "node-telegram-bot-api";
import { User, IUser } from "../../models/User";

export const listHandler = (bot: TelegramBot) => {
  bot.onText(/\/list/, async (msg) => {
    const chatId = msg.chat.id.toString();

    try {
      // Find the user by chatId
      const user = await User.findOne({ chatId }).lean<IUser>();

      // Check if the user exists
      if (!user) {
        bot.sendMessage(chatId, "You are not tracking any currencies yet.");
        return;
      }

      // Check if the user has tracked currencies
      if (!user.trackedCurrencies || user.trackedCurrencies.length === 0) {
        bot.sendMessage(chatId, "You are not tracking any currencies yet.");
        return;
      }

      // Map through trackedCurrencies to create the list message
      const trackingList = user.trackedCurrencies
        .map(
          (tracking, index) =>
            `${index + 1}. ${tracking.currency} → Goal: BRL ${tracking.goal}`
        )
        .join("\n");

      // Send the list of tracked currencies
      bot.sendMessage(
        chatId,
        `Here are the currencies you're tracking:\n\n${trackingList}`
      );
    } catch (error) {
      console.error("Error retrieving user trackings:", error);
      bot.sendMessage(chatId, "There was an error retrieving your trackings.");
    }
  });
};
