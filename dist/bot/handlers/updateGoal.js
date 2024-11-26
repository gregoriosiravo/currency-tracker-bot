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
exports.updateGoalHandler = void 0;
const User_1 = require("../../models/User");
const updateGoalHandler = (bot) => {
    bot.onText(/\/update (.+)/, (msg, match) => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = msg.chat.id.toString();
        const [currency, newGoal] = match ? match[1].split(' ') : [];
        if (!currency || isNaN(Number(newGoal))) {
            bot.sendMessage(chatId, 'Usage: /update <currency> <new goal>');
            return;
        }
        try {
            const user = yield User_1.User.findOneAndUpdate({ chatId, 'trackedCurrencies.currency': currency.toUpperCase() }, { $set: { 'trackedCurrencies.$.goal': parseFloat(newGoal) } });
            if (!user) {
                bot.sendMessage(chatId, 'You don’t have this currency tracked.');
            }
            else {
                bot.sendMessage(chatId, `Goal for ${currency.toUpperCase()} updated to BRL ${newGoal}`);
            }
        }
        catch (error) {
            bot.sendMessage(chatId, 'Error while updating goal.');
        }
    }));
};
exports.updateGoalHandler = updateGoalHandler;
