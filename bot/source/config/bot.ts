import dotenv from 'dotenv'

dotenv.config()


export const BOT_API_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ""

export const BOT_START_WORKING_WORDS = {
    primary: "НАЧАТЬ",
    secondary: "РАБОТА"
}