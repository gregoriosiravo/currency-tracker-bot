import TelegramBot, { Message } from 'node-telegram-bot-api';
import { User } from '../../models/User';

export const setGoalHandler = (bot: TelegramBot) => {
  bot.onText(/\/setgoal (.+)/, async (msg: Message, match: RegExpExecArray | null) => {
    const chatId = msg.chat.id.toString();
    const [currency, goal] = match ? match[1].split(' ') : [];

    if (!currency || isNaN(Number(goal))) {
      bot.sendMessage(chatId, 'Usage: /setgoal <currency> <goal>');
      return;
    }

    try {
      await User.findOneAndUpdate(
        { chatId },
        { currency: currency.toUpperCase(), goal: parseFloat(goal) },
        { upsert: true }
      );
      bot.sendMessage(chatId, `Goal set for ${currency.toUpperCase()} to BRL ${goal}`);
    } catch (error) {
      bot.sendMessage(chatId, 'Errore nel salvataggio dell’obiettivo.');
    }
  });
};