import TelegramBot, { Message } from "node-telegram-bot-api";
import { createOrUpdateUser } from "../../db/userActions";

export const addTrackingHandler = (
  currency: string,
  chatId: string,
  bot: TelegramBot
) => {
  // Log che l'utente sta iniziando il tracciamento della valuta
  console.log(
    `💬 L'utente con chatId: ${chatId} sta ora tracciando la valuta: ${currency}`
  );

  bot.sendMessage(
    chatId,
    `You chose ${currency}. Now, please choose your goal.`
  );

  bot.once("text", async (msg: Message) => {
    let text = msg.text || "";
    text = text.replace(",", ".");

    const goal = parseFloat(text);

    // Format the number to always show two decimal places
    const formattedGoal = goal.toFixed(2);

    console.log("this is goal: ", goal);

    if (isNaN(goal)) {
      bot.sendMessage(chatId, "Invalid goal. Please send a valid number.");
      return;
    }

    // Aggiungi o aggiorna l'utente con la valuta e il goal
    try {
      await createOrUpdateUser(chatId, currency, goal);
      bot.sendMessage(chatId, `✅ Goal set for ${currency} to BRL ${goal}`);
    } catch (error) {
      console.error("❌ Error while updating user goal:", error);
      bot.sendMessage(
        chatId,
        "❌ Something went wrong while setting the goal."
      );
    }
  });
};
