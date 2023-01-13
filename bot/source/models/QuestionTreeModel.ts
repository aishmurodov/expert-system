import {QuestionModel} from "./QuestionModel";

export type QuestionTreeModel<T extends string> = {
    [question_key in T]: QuestionModel<T>;
};