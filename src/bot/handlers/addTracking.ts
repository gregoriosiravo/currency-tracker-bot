import TelegramBot, { Message } from 'node-telegram-bot-api';
import { User } from '../../models/User';

export const addTrackingHandler = (bot: TelegramBot) => {
  bot.onText(/\/add (.+)/, async (msg: Message, match: RegExpExecArray | null) => {
    const chatId = msg.chat.id.toString();
    const [currency, goal] = match ? match[1].split(' ') : [];

    if (!currency || isNaN(Number(goal))) {
      bot.sendMessage(chatId, 'Usage: /add <currency> <goal>');
      return;
    }

    try {
      const user = await User.findOneAndUpdate(
        { chatId },
        {
          $addToSet: { trackedCurrencies: { currency: currency.toUpperCase(), goal: parseFloat(goal) } },
        },
        { upsert: true, new: true }
      );

      bot.sendMessage(chatId, `Tracking added: ${currency.toUpperCase()} with goal BRL ${goal}`);
    } catch (error) {
      bot.sendMessage(chatId, 'Error while adding tracking.');
    }
  });
};
