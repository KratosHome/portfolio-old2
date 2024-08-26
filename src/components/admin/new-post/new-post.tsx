'use client'
import React, { useState, useEffect, ChangeEvent, FC } from 'react'
import ReactQuill from 'react-quill'
import { useSession } from 'next-auth/react'
import useFetchUser from '@/hooks/useFetchUser'
import { AdminButton } from '@/components/UI/admin-button/admin-button'
import { createPostServer } from '@/server/blog/create-post.server'
import { toast } from 'react-toastify'
import { convertToBase64 } from '@/utils/convertToBase64'
import { localesData } from '@/data/locales-data'
import { CustomToolbarQuill } from '@/components/UI/custom-toolbar-quill/custom-toolbar-quill'
import { updatePostServer } from '@/server/blog/updape-post.server'

interface PostData {
  authorId: string
  title: string
  keyWords: string[]
  subTitle: string
  desc: string
  url: string
  local: LanguageProps
}

interface NewPostProps {
  data?: any
}

export const NewPost: FC<NewPostProps> = ({ data }) => {
  console.log('data', data)

  const { data: session }: any = useSession()
  const userData = useFetchUser(session)

  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeLanguage, setActiveLanguage] = useState<LanguageProps>('uk')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const initializePostsData = (): { [key in LanguageProps]: PostData } => {
    const initialData: any = {}

    localesData.forEach((lang) => {
      initialData[lang.locale] = {
        authorId: '',
        title: '',
        keyWords: [],
        subTitle: '',
        desc: '',
        url: '',
        local: lang.locale,
      }
    })

    return initialData
  }

  const [postsData, setPostsData] = useState<{
    [key in LanguageProps]: PostData
  }>(initializePostsData())

  useEffect(() => {
    if (userData) {
      setPostsData((prev) => {
        const updatedPostsData = { ...prev }
        Object.keys(updatedPostsData).forEach((lang) => {
          updatedPostsData[lang as LanguageProps].authorId = userData.user._id
        })
        return updatedPostsData
      })
    }
  }, [userData])

  const handleLanguageChange = (lang: LanguageProps) => {
    setActiveLanguage(lang)
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof PostData,
  ) => {
    const value = e.target.value
    if (field === 'keyWords') {
      setPostsData((prev) => ({
        ...prev,
        [activeLanguage]: {
          ...prev[activeLanguage],
          [field]: value.split(',').map((item) => item.trim()),
        },
      }))
    } else if (field === 'url') {
      setPostsData((prev) => {
        const updatedPostsData = { ...prev }
        Object.keys(updatedPostsData).forEach((lang) => {
          updatedPostsData[lang as LanguageProps][field] = value
        })
        return updatedPostsData
      })
    } else {
      setPostsData((prev) => ({
        ...prev,
        [activeLanguage]: {
          ...prev[activeLanguage],
          [field]: value,
        },
      }))
    }
  }

  useEffect(() => {
    if (data?.post) {
      const updatedPostsData = initializePostsData()

      data.post.forEach((postItem: any) => {
        const locale = postItem.local as LanguageProps
        if (updatedPostsData[locale]) {
          updatedPostsData[locale] = {
            authorId: postItem.authorId || '',
            title: postItem.title || '',
            keyWords: postItem.keyWords || [],
            subTitle: postItem.subTitle || '',
            desc: postItem.desc || '',
            url: postItem.url || '',
            local: locale,
          }
        }
      })

      setPostsData(updatedPostsData)
    }
  }, [data])

  const handleContentChange = (value: string) => {
    setPostsData((prev) => ({
      ...prev,
      [activeLanguage]: {
        ...prev[activeLanguage],
        desc: value,
      },
    }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const validateAllFields = () => {
    for (const lang of ['uk', 'en', 'fr'] as LanguageProps[]) {
      const postData = postsData[lang]
      if (
        !postData.title ||
        !postData.keyWords.length ||
        !postData.subTitle ||
        !postData.desc ||
        !postData.url
      ) {
        return `Всі поля повинні бути заповнені для локалізації ${lang.toUpperCase()}`
      }
    }
    return null
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const error = validateAllFields()
    if (error) {
      setErrorMessage(error)
      return
    }

    setLoading(true)

    let imageBase64 = null
    if (image) {
      imageBase64 = await convertToBase64(image)
    }

    const updatedPostsData = { ...postsData }
    Object.keys(updatedPostsData).forEach((lang) => {
      const currentUrl = updatedPostsData[lang as LanguageProps].url
      if (!currentUrl.endsWith(`-${lang}`)) {
        updatedPostsData[lang as LanguageProps].url += `-${lang}`
      }
    })

    let result
    if (data?.post) {
      result = await updatePostServer({
        data: updatedPostsData,
        image: imageBase64,
      })
    } else {
      result = await createPostServer({
        data: updatedPostsData,
        image: imageBase64,
      })
    }

    if (result.success) {
      toast(
        `Пост ${data?.post ? 'оновлено' : 'створено'}, очікуйте на перевірку`,
        {
          type: 'success',
        },
      )
    } else {
      toast(`Помилка при ${data?.post ? 'оновленні' : 'створенні'} поста`, {
        type: 'error',
      })
    }

    setLoading(false)
  }
  return (
    <div>
      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
      {data ? (
        <img
          src={data.post[0].img}
          alt={data.post[0].title}
          width={30}
          height={30}
          className="size-[230px]"
        />
      ) : null}
      <form onSubmit={onSubmit}>
        <input
          placeholder="посилання"
          className="mb-4 w-full rounded border p-2"
          value={postsData[activeLanguage].url}
          onChange={(e) => handleInputChange(e, 'url')}
        />
        <input
          className="file-input__create-post"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <div className="mb-4 flex space-x-4">
          {localesData.map((lang) => (
            <button
              key={lang.locale}
              type="button"
              onClick={() => handleLanguageChange(lang.locale as LanguageProps)}
              className={`rounded px-4 py-2 ${
                activeLanguage === lang.locale
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {lang.locale.toUpperCase()}
            </button>
          ))}
        </div>
        <input
          placeholder="Заголовок"
          className="mb-4 w-full rounded border p-2"
          value={postsData[activeLanguage].title}
          onChange={(e) => handleInputChange(e, 'title')}
        />
        <input
          placeholder="Ключові слова"
          className="mb-4 w-full rounded border p-2"
          value={postsData[activeLanguage].keyWords.join(', ')}
          onChange={(e) => handleInputChange(e, 'keyWords')}
        />
        <input
          placeholder="Короткий заголовок"
          className="mb-4 w-full rounded border p-2"
          value={postsData[activeLanguage].subTitle}
          onChange={(e) => handleInputChange(e, 'subTitle')}
        />
        <div className="min-h-[200px]">
          <CustomToolbarQuill />
          <ReactQuill
            key={activeLanguage}
            theme="snow"
            placeholder="Стаття"
            value={postsData[activeLanguage].desc}
            onChange={handleContentChange}
            modules={{ toolbar: { container: '#toolbar' } }}
            style={{ height: '300px' }}
            className="min-h-[300px] w-full rounded-b-lg border-gray-300 bg-white p-2 text-black shadow-sm"
          />
        </div>
        <AdminButton type="submit" disabled={loading}>
          Зберегти
        </AdminButton>
      </form>
    </div>
  )
}
