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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTrackingHandler = void 0;
const User_1 = require("../../models/User");
const addTrackingHandler = (bot) => {
    bot.onText(/\/add (.+)/, (msg, match) => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = msg.chat.id.toString();
        const [currency, goal] = match ? match[1].split(' ') : [];
        if (!currency || isNaN(Number(goal))) {
            bot.sendMessage(chatId, 'Usage: /add <currency> <goal>');
            return;
        }
        try {
            const user = yield User_1.User.findOneAndUpdate({ chatId }, {
                $addToSet: { trackedCurrencies: { currency: currency.toUpperCase(), goal: parseFloat(goal) } },
            }, { upsert: true, new: true });
            bot.sendMessage(chatId, `Tracking added: ${currency.toUpperCase()} with goal BRL ${goal}`);
        }
        catch (error) {
            bot.sendMessage(chatId, 'Error while adding tracking.');
        }
    }));
};
exports.addTrackingHandler = addTrackingHandler;
