import { Markup, Middleware} from "telegraf";
import {UserModel} from "../models";
import {StartAnswer} from "../answers";
import {UserContext} from "../types";

export const SessionMiddleware: Middleware<UserContext> = async (ctx, next) => {

    if (ctx.updateType !== "message" && ctx.updateType !== "callback_query") {
        return ctx.reply("Пока что не понимаю данного действия!")
    }

    const user = UserModel.findById(ctx.from!.id)

    if (!user) {
        UserModel.create({
           user_id: ctx.from!.id,
           currentQuestion: undefined
        })
        return ctx.reply(StartAnswer.text, {
            ...StartAnswer.keyboard
        })
    }

    ctx.user = user

    return next()

}