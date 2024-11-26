import dotenv from 'dotenv';
import { connectDB } from './db';
import bot, { startAlertCheck } from './bot/bot';

dotenv.config();

const startApp = async () => {
  await connectDB();
  startAlertCheck();
};

startApp().then(() => console.log('Bot avviato'));
