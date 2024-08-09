'use server'
import TelegramBot from 'node-telegram-bot-api'
import { Reviews } from '@/server/reviws/reviewsSchema'
import { connectToDb } from '@/server/connectToDb'

export const createReviewAction = async (formData: any) => {
  try {
    const chatId = `${process.env.TELEGRAM_BOT_CHAT_ID}`
    const bot = new TelegramBot(`${process.env.TELEGRAM_BOT_TOKEN}`, {
      polling: true,
    })
    await connectToDb()

    const newReview = new Reviews({
      userName: formData.userName,
      email: formData.email,
      company: formData.company,
      reviews: formData.reviews,
      isPublic: false,
    })
    await newReview.save()

    await bot.sendMessage(
      chatId,
      `
               Name: ${formData.userName},
               Email: ${formData.email},
               Company: ${formData.company},
               Reviews: ${formData.reviews},
      `,
    )
  } catch (error) {
    throw new Error('createReviewAction')
  }
}
