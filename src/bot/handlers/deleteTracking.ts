import TelegramBot, { Message } from 'node-telegram-bot-api';
import { User } from '../../models/User';

export const deleteTrackingHandler = (bot: TelegramBot) => {
  bot.onText(/\/delete (.+)/, async (msg: Message, match: RegExpExecArray | null) => {
    const chatId = msg.chat.id.toString();
    const currency = match ? match[1].toUpperCase() : '';

    if (!currency) {
      bot.sendMessage(chatId, 'Usage: /delete <currency>');
      return;
    }

    try {
      const result = await User.findOneAndUpdate(
        { chatId },
        { $pull: { trackedCurrencies: { currency } } }
      );

      if (!result) {
        bot.sendMessage(chatId, 'You don’t have this currency tracked.');
      } else {
        bot.sendMessage(chatId, `Tracking for ${currency} has been removed.`);
      }
    } catch (error) {
      bot.sendMessage(chatId, 'Error while deleting tracking.');
    }
  });
};
