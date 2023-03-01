import {Telegraf} from "telegraf"
import {BOT_API_TOKEN, BOT_START_WORKING_WORDS, mongo} from "./config";
import {SessionMiddleware} from "./middlewares";
import {StartAnswer} from "./answers";
import {UserContext} from "./types";
import {questionsKeys} from "./config/questions";
import {QuestionTypes} from "./models/QuestionModel";
import {callbackQuery} from "telegraf/filters";
import mongoose from "mongoose";


const app = new Telegraf<UserContext>(BOT_API_TOKEN)

app.use(SessionMiddleware)

app.start(ctx => {
    return ctx.reply(StartAnswer.text, {
        ...StartAnswer.keyboard
    })
})

app.hears([BOT_START_WORKING_WORDS.primary, BOT_START_WORKING_WORDS.secondary], async (ctx) => {
    const answer = ctx.user.currentQuestion ? ctx.user.currentQuestion : await ctx.user.setAnswer<questionsKeys>('start')

    ctx.reply(answer.text, {
        ...('keyboard' in answer ? answer.keyboard : ctx.user.keyboard)
    })
})

app.on("callback_query", async (ctx, next) => {

    try {
        await ctx.answerCbQuery("Принято")

        if (!ctx.user.currentQuestion || ctx.user.currentQuestion.type !== QuestionTypes.BUTTON || !ctx.has(callbackQuery("data"))) {
            return next()
        }

        const key = ctx.callbackQuery.data as questionsKeys

        const button = ctx.user.currentQuestion.buttons.find(item => item.query === key)!

        ctx.editMessageText(`${ctx.user.currentQuestion.text} \nВы выбрали вариант: ${button.text}`)

        const answer = await ctx.user.setAnswer(key)

        ctx.sendMessage(answer.text, {
            ...answer.keyboard
        })

    } catch (error) {
        console.error(error)
    }
})


mongoose
    .connect(mongo.url, mongo.options)
    .then(() => {
        console.info('Mongo Connected');

        app.launch().then(() => {
            console.log("Bot started")
        }).catch((error) => {
            console.error(error.message, error)
        })

    })
    .catch((error) => {
        console.error(error.message, error);
    });


console.log("BOT INITED")

process.once('SIGINT', () => app.stop('SIGINT'));
process.once('SIGTERM', () => app.stop('SIGTERM'));