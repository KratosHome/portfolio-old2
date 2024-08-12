'use server'
import TelegramBot from 'node-telegram-bot-api'
import { formatDate } from '@/utils/formatDate'

export async function messageMe(formData: any) {
  try {
    const formattedDate = formatDate(new Date())
    const bot = new TelegramBot(`${process.env.TELEGRAM_BOT_TOKEN}`, {
      polling: true,
    })

    const chatId = `${process.env.TELEGRAM_BOT_CHAT_ID}`
    await bot.sendMessage(
      chatId,
      `
    idUser: ще в роботі,
    Мова: ${formData.locale},
    Тип повідомлення: message,
    Дата: ${formattedDate},
    Імя: ${formData.name},
    Імейл: ${formData.email},
    Телефон: ${formData.number}, 
    Повідомлення: ${formData.message},
    `,
    )
  } catch (error) {
    return { error: true }
  }
}
// Todo: Add id user to message
