import {QuestionTreeModel} from "../models/QuestionTreeModel";

const questionsJson: Record<string, any> = require("../../questions.json")

if (!('start' in questionsJson)) {
    throw new Error("The start key must be implemented")
}

export type questionsKeys = keyof typeof questionsJson

export const questions: QuestionTreeModel<questionsKeys> = questionsJson