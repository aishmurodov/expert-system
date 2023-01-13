import {QuestionTreeModel} from "../models/QuestionTreeModel";
import {QuestionTypes} from "../models/QuestionModel";

export type questionsKeys = "start"
    | 'no-18-answer'| 'degree-question'
    | 'commerce-question-with-no-degree' | 'commerce-question-with-degree'
    | "no-commerce-answer" | 'is-ready-to-study'
    | 'not-ready-to-study-answer' | 'test-question'
    | 'did-not-test-question-answer'| 'did-test-question-answer'
    | 'work-question'
    | 'answer-engineer-is' | 'answer-programmer' | 'answer-business-analyst'


export const questions: QuestionTreeModel<questionsKeys> = {
    'start': {
        type: QuestionTypes.BUTTON,
        text: "Вы совершеннолетний?",
        buttons: [
            {
                text: "Нет",
                query: "no-18-answer"
            },
            {
                text: "Да",
                query: "degree-question"
            }
        ]
    },
    'no-18-answer': {
        type: QuestionTypes.EXIT,
        text: "Не берем. Приходите, когда будет  18 лет"
    },
    'degree-question': {
        type: QuestionTypes.BUTTON,
        text: "Есть ли диплом о высшем образовании по технической специальности?",
        buttons: [
            {
                text: "Нет",
                query: "commerce-question-with-no-degree"
            },
            {
                text: "Да",
                query: "commerce-question-with-degree"
            }
        ]
    },
    'commerce-question-with-no-degree': {
        type: QuestionTypes.BUTTON,
        text: "Есть ли коммерческий опыт работы?",
        buttons: [
            {
                text: "Нет",
                query: "no-commerce-answer"
            },
            {
                text: "Есть",
                query: "is-ready-to-study"
            }
        ]
    },
    'no-commerce-answer': {
        type: QuestionTypes.EXIT,
        text: "Нам не подходят специалисты без опыта работы."
    },
    'is-ready-to-study': {
        type: QuestionTypes.BUTTON,
        text: "Готовы ли вы работать на пол ставки и учиться?",
        buttons: [
            {
                text: "Нет",
                query: "not-ready-to-study-answer"
            },
            {
                text: "Да",
                query: "test-question"
            },
        ]
    },
    'not-ready-to-study-answer': {
        type: QuestionTypes.EXIT,
        text: "Вы нам не подходите"
    },
    'test-question': {
        type: QuestionTypes.BUTTON,
        text: "Выполнение тестового задания",
        buttons: [
            {
                text: "Не выполнил",
                query: "did-not-test-question-answer"
            },
            {
                text: "Выполнил",
                query: "did-test-question-answer"
            },
        ]
    },
    'did-not-test-question-answer': {
        type: QuestionTypes.EXIT,
        text: "Приходите позже."
    },
    'did-test-question-answer': {
        type: QuestionTypes.EXIT,
        text: "Вы приняты на работу."
    },
    'commerce-question-with-degree': {
        type: QuestionTypes.BUTTON,
        text: "Есть ли коммерческий опыт работы и какой?",
        buttons: [
            {
                text: "Менее 2-х лет",
                query: "is-ready-to-study"
            },
            {
                text: "От 2-х лет",
                query: "work-question"
            }
        ]
    },
    'work-question': {
        type: QuestionTypes.BUTTON,
        text: "Какую область работы вы бы хотели выбрать?",
        buttons: [
            {
                text: "Инженер ИС",
                query: "answer-engineer-is"
            },
            {
                text: "Программист",
                query: "answer-programmer"
            },
            {
                text: "Бизнес-аналитик",
                query: "answer-business-analyst"
            }
        ]
    },
    'answer-engineer-is': {
        type: QuestionTypes.EXIT,
        text: "Вы приняты на должность Инженера ИС."
    },
    'answer-programmer': {
        type: QuestionTypes.EXIT,
        text: "Вы приняты на должность программиста."
    },
    'answer-business-analyst': {
        type: QuestionTypes.EXIT,
        text: "Вы приняты на должность Бизнес-аналитик."
    }
}