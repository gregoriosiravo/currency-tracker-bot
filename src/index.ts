import dotenv from "dotenv";
import { connectDB } from "./db";
import { startBot } from "./bot/bot";

dotenv.config();

const startApp = async () => {
  try {
    await connectDB();

    console.log("#################  Database connected ####################");

    startBot();
    console.log("✅Bot Started");
  } catch (error) {
    console.error(
      "❌ Errore nell'avvio del bot o nella connessione al database:",
      error
    );
    process.exit(1); // Termina l'app se la connessione fallisce
  }
};

startApp();
