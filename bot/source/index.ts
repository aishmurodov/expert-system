import {Telegraf} from "telegraf"
import {BOT_API_TOKEN, BOT_START_WORKING_WORDS} from "./config";
import {SessionMiddleware} from "./middlewares";
import {StartAnswer} from "./answers";
import {UserContext} from "./types";
import {questionsKeys} from "./config/questions";
import {QuestionTypes} from "./models/QuestionModel";
import {callbackQuery} from "telegraf/filters";

const app = new Telegraf<UserContext>(BOT_API_TOKEN)

app.use(SessionMiddleware)

app.start(ctx => {
    return ctx.reply(StartAnswer.text, {
        ...StartAnswer.keyboard
    })
})

app.hears([BOT_START_WORKING_WORDS.primary, BOT_START_WORKING_WORDS.secondary], (ctx) => {
    const answer = ctx.user.setAnswer<questionsKeys>('start')

    ctx.reply(answer.text, {
        ...answer.keyboard
    })
})

app.on("callback_query", async (ctx, next) => {

    await ctx.answerCbQuery("Принято")

    if (ctx.user.currentQuestion.type !== QuestionTypes.BUTTON || !ctx.has(callbackQuery("data"))) {
        return next()
    }

    const key = ctx.callbackQuery.data as questionsKeys

    const answer = ctx.user.setAnswer(key)

    ctx.editMessageText(answer.text, {
        ...answer.keyboard
    })
})

app.launch().then(() => {
    console.log("Started")
})

process.once('SIGINT', () => app.stop('SIGINT'));
process.once('SIGTERM', () => app.stop('SIGTERM'));