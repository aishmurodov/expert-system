import {Markup} from "telegraf";
import { InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyKeyboardRemove, ForceReply } from "telegraf/typings/core/types/typegram";

export interface AnswerTypeInterface<T extends InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply> {
    text: string,
    keyboard?: Markup.Markup<T>
}