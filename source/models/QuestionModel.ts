interface BaseQuestionModel {
    text: string
}

interface QuestionButton<T extends string> {
    text: string,
    query: T
}

export enum QuestionTypes {
    BUTTON = "button",
    EXIT = "exit"
}

interface QuestionModelWithButtons<T extends string> extends BaseQuestionModel {
    type: QuestionTypes.BUTTON,
    buttons: QuestionButton<T>[]
}

interface QuestionModelExit extends BaseQuestionModel {
    type: QuestionTypes.EXIT
}

export type QuestionModel<T extends string> = QuestionModelWithButtons<T> | QuestionModelExit