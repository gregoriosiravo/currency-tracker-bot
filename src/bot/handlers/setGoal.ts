import TelegramBot, { Message } from "node-telegram-bot-api";
import { User } from "../../models/User";

export const setGoalHandler = (bot: TelegramBot) => {
  bot.on('callback_query', async (query) => {
    const chatId = query.message?.chat.id.toString();  
    const data = query.data;  // Questo è il valore della valuta selezionata

    if (!chatId || !data) return;

    const currency = data;
    bot.sendMessage(chatId, `You chose ${currency}. Now, please choose your goal.`);

    bot.onText(/^\d+(\.\d+)?$/, async (msg: Message, match: RegExpExecArray | null) => {
      const goal = match ? parseFloat(match[0]) : NaN;

      if (isNaN(goal)) {
        bot.sendMessage(chatId, 'Invalid goal. Please send a valid number.');
        return;
      }

      try {
        // Salva la nuova valuta e obiettivo nel database
        await User.findOneAndUpdate(
          { chatId },
          {
            $push: { trackedCurrencies: { currency, goal } },
          },
          { upsert: true }
        );
        bot.sendMessage(chatId, `Goal set for ${currency} to BRL ${goal}`);
      } catch (error) {
        bot.sendMessage(chatId, 'Error while saving the goal.');
      }
    });
  });
};
