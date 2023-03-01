import {QuestionModel, QuestionTypes} from "./QuestionModel";
import {AnswerTypeInterface} from "../types";
import {InlineKeyboardMarkup} from "telegraf/typings/core/types/typegram";
import {questions, questionsKeys} from "../config/questions";
import {Markup} from "telegraf";
import UserSchema, {UserSchemaInterface} from "../schemas/user.schema";
import AnswerSchema from "../schemas/answer.schema";

export interface UserInterface {
    user_id: number,
    currentQuestion?: QuestionModel<questionsKeys>
}

export class UserModel {

    private readonly _model: UserSchemaInterface

    constructor(_model: UserSchemaInterface) {
        this._model = _model
    }

    public get currentQuestion() {
        return this._model.currentQuestion as QuestionModel<questionsKeys>
    }

    public get keyboard() {
        const keyboard: any[][] = []

        if (this.currentQuestion.type === QuestionTypes.BUTTON) {
            let currentIndex = -1

            for (let i = 0; i < this.currentQuestion.buttons.length; i++) {
                if ((i + 1) % 2 !== 0) {
                    keyboard.push([])
                    currentIndex++
                }
                const button = this.currentQuestion.buttons[i]

                keyboard[currentIndex].push(Markup.button.callback(button.text, button.query))
            }
        }

        return Markup.inlineKeyboard(keyboard)
    }

    public static async create(payload: UserInterface) {
        return new UserModel(await UserSchema.create(payload))
    }

    public static async findById(user_id: UserInterface['user_id']) {
        const user = await UserSchema.findOne({
            user_id: user_id
        })

        return user ? new UserModel(user) : null
    }

    public async setQuestion(state: QuestionModel<questionsKeys> | null) {
        await UserSchema.updateOne({
            user_id: this._model.user_id
        }, {
            currentQuestion: state
        })

        this._model.currentQuestion = state ? state : undefined

        return this
    }

    public async setAnswer<T extends string>(data: T): Promise<AnswerTypeInterface<InlineKeyboardMarkup>> {
        if (!(data in questions)) {
            return {
                text: "Путь не найден",
            }
        }

        await AnswerSchema.create({
            user: this._model._id,
            question: this._model.currentQuestion?.text,
            answer: data
        })

        await this.setQuestion(questions[data])

        const response = JSON.parse(JSON.stringify({
            text: this.currentQuestion.text,
            keyboard: this.keyboard
        }))

        if (this.currentQuestion.type === QuestionTypes.EXIT) {
            await this.setQuestion(null)
        }

        return response

    }

}