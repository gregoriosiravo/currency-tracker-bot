"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAlertCheck = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const start_1 = require("./handlers/start");
const setGoal_1 = require("./handlers/setGoal");
const deleteTracking_1 = require("./handlers/deleteTracking");
const updateGoal_1 = require("./handlers/updateGoal");
const addTracking_1 = require("./handlers/addTracking");
const User_1 = require("../models/User");
const currencyService_1 = require("../services/currencyService");
const bot = new node_telegram_bot_api_1.default(process.env.TELEGRAM_BOT_TOKEN || "", {
    polling: true,
});
// Register handlers
(0, start_1.startHandler)(bot);
(0, setGoal_1.setGoalHandler)(bot);
(0, deleteTracking_1.deleteTrackingHandler)(bot);
(0, updateGoal_1.updateGoalHandler)(bot);
(0, addTracking_1.addTrackingHandler)(bot);
const startAlertCheck = () => {
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield User_1.User.find();
        users.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
            user.trackedCurrencies.forEach((tracked) => __awaiter(void 0, void 0, void 0, function* () {
                const rate = yield (0, currencyService_1.getCurrencyRate)(tracked.currency);
                if (rate <= tracked.goal) {
                    bot.sendMessage(user.chatId, `🚨 GOOOOOAAAALLLLL! ${tracked.currency} reached BRL ${rate}`);
                }
            }));
        }));
    }), 60000);
};
exports.startAlertCheck = startAlertCheck;
exports.default = bot;
