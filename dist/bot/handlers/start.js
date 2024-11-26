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
exports.startHandler = void 0;
const startHandler = (bot) => {
    bot.onText(/\/start/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = msg.chat.id.toString();
        yield bot.sendMessage(chatId, 'Welcome to Currency Tracker Bot! This bot will help you tracking exchange between a currency and BRL, to use write: /setgoal <currency> <goal> ');
    }));
};
exports.startHandler = startHandler;
