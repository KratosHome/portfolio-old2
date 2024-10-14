'use server'
import TelegramBot from 'node-telegram-bot-api'
import { formatDate } from '@/utils/formatDate'

export async function telegramAction(formData: any) {
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
