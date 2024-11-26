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
exports.setGoalHandler = void 0;
const User_1 = require("../../models/User");
const setGoalHandler = (bot) => {
    bot.onText(/\/setgoal (.+)/, (msg, match) => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = msg.chat.id.toString();
        const [currency, goal] = match ? match[1].split(' ') : [];
        if (!currency || isNaN(Number(goal))) {
            bot.sendMessage(chatId, 'Usage: /setgoal <currency> <goal>');
            return;
        }
        try {
            yield User_1.User.findOneAndUpdate({ chatId }, { currency: currency.toUpperCase(), goal: parseFloat(goal) }, { upsert: true });
            bot.sendMessage(chatId, `Goal set for ${currency.toUpperCase()} to BRL ${goal}`);
        }
        catch (error) {
            bot.sendMessage(chatId, 'Errore nel salvataggio dell’obiettivo.');
        }
    }));
};
exports.setGoalHandler = setGoalHandler;
