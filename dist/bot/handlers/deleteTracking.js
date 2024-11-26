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
exports.deleteTrackingHandler = void 0;
const User_1 = require("../../models/User");
const deleteTrackingHandler = (bot) => {
    bot.onText(/\/delete (.+)/, (msg, match) => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = msg.chat.id.toString();
        const currency = match ? match[1].toUpperCase() : '';
        if (!currency) {
            bot.sendMessage(chatId, 'Usage: /delete <currency>');
            return;
        }
        try {
            const result = yield User_1.User.findOneAndUpdate({ chatId }, { $pull: { trackedCurrencies: { currency } } });
            if (!result) {
                bot.sendMessage(chatId, 'You don’t have this currency tracked.');
            }
            else {
                bot.sendMessage(chatId, `Tracking for ${currency} has been removed.`);
            }
        }
        catch (error) {
            bot.sendMessage(chatId, 'Error while deleting tracking.');
        }
    }));
};
exports.deleteTrackingHandler = deleteTrackingHandler;
