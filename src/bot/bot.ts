import TelegramBot from "node-telegram-bot-api";
import { startCommand } from "./commands/startCommand";
import { optionCommand } from "./commands/optionCommand";
import { callbackQueryHandler } from "./handlers/callbackQueryHandler";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || "", {
  polling: true,
});

// Register commands
startCommand(bot);
optionCommand(bot);

// Register handlers
callbackQueryHandler(bot);

console.log("✅ Bot is running...");


export default bot;
