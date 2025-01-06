'use server'
import TelegramBot from 'node-telegram-bot-api'
import { formatDate } from '@/utils/formatDate'

interface FormData {
  name: string
  email: string
  number: string
  message: string
}

export async function telegramAction(formData: FormData) {
  const formattedDate = formatDate(new Date())
  const bot = new TelegramBot(`${process.env.TELEGRAM_BOT_TOKEN}`, {
    polling: true,
  })

  const chatId = `${process.env.TELEGRAM_BOT_CHAT_ID}`
  await bot.sendMessage(
    chatId,
    `
    Data: ${formattedDate},
    Name: ${formData.name}, 
    Email: ${formData.email},
    Number: ${formData.number},
    Message: ${formData.message},
    `,
  )
}
