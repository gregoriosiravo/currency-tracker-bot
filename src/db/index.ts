import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';

export const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('################# ✅ Database connected ####################');
      break;
    } catch (error) {
      console.error(`❌ Database connection failed (retry ${retries + 1}/${maxRetries})`, error);
      retries++;
      await new Promise(res => setTimeout(res, 5000)); // aspetta 5 secondi e riprova
    }
  }

  if (retries === maxRetries) {
    console.error('❌ Could not connect to database after several attempts.');
    process.exit(1);
  }
};
