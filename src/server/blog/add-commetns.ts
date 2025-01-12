'use server'
import TelegramBot from 'node-telegram-bot-api'
import { Post } from '@/server/blog/blog-schema'
import { revalidatePath } from 'next/cache'

interface CommentFormData {
  postId: string
  locale: string
  userId: string
  author: string
  message: string
  userLogo?: string
}

export async function addComments(formData: CommentFormData) {
  'use server'
  try {
    const post = await Post.findOne({
      postId: formData.postId,
      local: formData.locale,
    })

    if (!post) {
      return { success: false, message: 'Post not found' }
    }

    post.comments.push({
      authorId: formData.userId,
      author: formData.author,
      text: formData.message,
      userLogo: formData.userLogo,
      isPublished: false,
    })

    await post.save()

    revalidatePath('/blog')
    const bot = new TelegramBot(`${process.env.TELEGRAM_BOT_TOKEN}`, {
      polling: true,
    })

    const chatId = `${process.env.TELEGRAM_BOT_CHAT_ID}`
    await bot.sendMessage(
      chatId,
      `
    Відгук для поста,
    userId: ${formData.userId},
    postId: ${formData.postId},
    locale: ${formData.locale},
    Повідомлення: ${formData.message},
    `,
    )

    return { success: true }
  } catch (error) {
    return { success: false, message: error }
  }
}
