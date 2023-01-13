import {AnswerTypeInterface} from "../types";
import {ReplyKeyboardMarkup, ReplyKeyboardRemove} from "telegraf/typings/core/types/typegram";
import {Markup} from "telegraf";
import {BOT_START_WORKING_WORDS} from "../config";

export const StartAnswer: AnswerTypeInterface<ReplyKeyboardMarkup> = {
    text: "Привет! Напиши мне слово ВУЗ, чтобы начать действовать!)",
    keyboard: Markup.keyboard([
        [
            Markup.button.text(BOT_START_WORKING_WORDS.primary)
        ]
    ]).resize(true).placeholder(BOT_START_WORKING_WORDS.secondary)
}