import dotenv from 'dotenv';
import { connectDB } from './db';

dotenv.config();

const startApp = async () => {
  await connectDB();
};

startApp().then(() => console.log('Bot avviato'));
