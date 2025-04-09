import TelegramBot from "node-telegram-bot-api";
import { addTrackingHandler } from "./addTracking";

export const inlineKeyboardHandler = (bot: TelegramBot) => {
  bot.onText(/\/options/, (msg) => {
    const chatId = msg.chat.id;

    // Define the inline keyboard layout
    const inlineKeyboard = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Add Tracking", callback_data: "add_tracking" },
            { text: "Update Goal", callback_data: "update_goal" },
          ],
          [
            { text: "Delete Tracking", callback_data: "delete_tracking" },
            { text: "List Trackings", callback_data: "list_trackings" },
          ],
        ],
      },
    };

    bot.sendMessage(chatId, "Choose an action:", inlineKeyboard);
  });

  bot.on("callback_query", async (query) => {
    const chatId = query.message?.chat.id;
    const data = query.data;

    if (!chatId || !data) return;

    switch (data) {
      case "add_tracking":
        bot.sendMessage(chatId, "Please choose a currency to track.");
        console.log("add new tracking start in chatId: " + chatId);
        addTrackingHandler(bot);
        break;
      case "update_goal":
        bot.sendMessage(chatId, "You chose to update a goal.");
        break;
      case "delete_tracking":
        bot.sendMessage(chatId, "You chose to delete tracking.");
        break;
      case "list_trackings":
        bot.sendMessage(chatId, "Here are your current trackings:");
        break;
      default:
        bot.sendMessage(chatId, "Invalid option.");
        break;
    }

    bot.answerCallbackQuery(query.id);
  });
};
