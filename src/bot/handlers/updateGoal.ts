import TelegramBot, { Message } from 'node-telegram-bot-api';
import { User } from '../../models/User';

export const updateGoalHandler = (bot: TelegramBot) => {
  bot.onText(/\/update (.+)/, async (msg: Message, match: RegExpExecArray | null) => {
    const chatId = msg.chat.id.toString();
    const [currency, newGoal] = match ? match[1].split(' ') : [];

    if (!currency || isNaN(Number(newGoal))) {
      bot.sendMessage(chatId, 'Usage: /update <currency> <new goal>');
      return;
    }

    try {
      const user = await User.findOneAndUpdate(
        { chatId, 'trackedCurrencies.currency': currency.toUpperCase() },
        { $set: { 'trackedCurrencies.$.goal': parseFloat(newGoal) } }
      );

      if (!user) {
        bot.sendMessage(chatId, 'You don’t have this currency tracked.');
      } else {
        bot.sendMessage(chatId, `Goal for ${currency.toUpperCase()} updated to BRL ${newGoal}`);
      }
    } catch (error) {
      bot.sendMessage(chatId, 'Error while updating goal.');
    }
  });
};
