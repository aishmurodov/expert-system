import {QuestionModel, QuestionTypes} from "./QuestionModel";
import {AnswerTypeInterface} from "../types";
import {InlineKeyboardMarkup} from "telegraf/typings/core/types/typegram";
import {questions, questionsKeys} from "../config/questions";
import {Markup} from "telegraf";

export interface UserInterface {
    user_id: number,
    currentQuestion?: QuestionModel<questionsKeys>
}

const users: { [key: string]: UserInterface } = {  }

export class UserModel {

    private readonly _model: UserInterface

    constructor(_model: UserInterface) {
        this._model = _model
    }

    public static create (payload: UserInterface) {
        users[payload.user_id] = payload

        return new UserModel(users[payload.user_id])
    }

    public static findById (user_id: UserInterface['user_id']) {
        if (!(user_id in users)) {
            return undefined
        }
        return new UserModel(users[user_id])
    }

    public get currentQuestion () {
        return this._model.currentQuestion as QuestionModel<questionsKeys>
    }

    public setQuestion (state: QuestionModel<questionsKeys>) {
        users[this._model.user_id].currentQuestion = state
        this._model.currentQuestion = state

        return this
    }

    private get keyboard () {
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

    public setAnswer<T extends string>(data: T): AnswerTypeInterface<InlineKeyboardMarkup> {
        if (!(data in questions)) {
            return {
                text: "Путь не найден",
            }
        }

        this.setQuestion(questions[data])


        return {
            text: this.currentQuestion.text,
            keyboard: this.keyboard
        }
    }

}