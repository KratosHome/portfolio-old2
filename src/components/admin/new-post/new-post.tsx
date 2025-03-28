'use client'
import React, { useState, useEffect, ChangeEvent, FC } from 'react'
import ReactQuill from 'react-quill'
import { useSession } from 'next-auth/react'
import useFetchUser from '@/hooks/useFetchUser'
import { createPostServer } from '@/server/blog/create-post.server'
import { toast } from 'react-toastify'
import { convertToBase64 } from '@/utils/convertToBase64'
import { localesData } from '@/data/locales-data'
import { updatePostServer } from '@/server/blog/updape-post.server'
import Image from 'next/image'
import { MdDelete } from 'react-icons/md'
import { AdminButton } from '@/components/UI/client/admin-button/admin-button'
import { Input } from '@/components/UI/client/input/input'
import { CustomToolbarQuill } from '@/components/UI/client/custom-toolbar-quill/custom-toolbar-quill'

interface PostData {
  authorId: string
  title: string
  keyWords: string[]
  subTitle: string
  desc: string
  url: string
  local: LanguageProps
  isPublished: boolean
  img: string
  categories: string[]
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
  const [isPublished, setIsPublished] = useState<boolean>(false)

  const [categoriesInput, setCategoriesInput] = useState<string>('')
  const [categories, setCategories] = useState<string[]>([])

  const initializePostsData = (): { [key in LanguageProps]: PostData } => {
    const initialData: any = {}

    localesData.forEach((lang) => {
      initialData[lang.local] = {
        authorId: '',
        title: '',
        keyWords: [],
        categories: [],
        subTitle: '',
        desc: '',
        url: '',
        local: lang.local,
        isPublished: false,
        img: '',
      }
    })

    return initialData
  }

  const handleAddCategories = () => {
    if (categoriesInput.trim() !== '') {
      setPostsData((prev) => ({
        ...prev,
        [activeLanguage]: {
          ...prev[activeLanguage],
          categories: [
            ...prev[activeLanguage].categories,
            categoriesInput.trim(),
          ],
        },
      }))
      setCategoriesInput('')
    }
  }

  const handleRemoveCategories = (index: number) => {
    setPostsData((prev) => ({
      ...prev,
      [activeLanguage]: {
        ...prev[activeLanguage],
        categories: prev[activeLanguage].categories.filter(
          (_, i) => i !== index,
        ),
      },
    }))
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
            isPublished: postItem.isPublished || false,
            img: postItem.img || '',
            categories: postItem.categories || [],
          }
        }
      })
      setImage(data.post[0].img)
      setPostsData(updatedPostsData)
      setCategories(data.post[0].categories)
    }
    // eslint-disable-next-line
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
        postId: data.post[0].postId,
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
        <Image
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
              key={lang.local}
              type="button"
              onClick={() => handleLanguageChange(lang.local as LanguageProps)}
              className={`rounded px-4 py-2 ${
                activeLanguage === lang.local
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {lang.local.toUpperCase()}
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
        <div>
          <h2 className="text-2xl font-bold">Категорія (фільтр)</h2>
          <div className="flex flex-wrap gap-4">
            {postsData[activeLanguage].categories.map((category, index) => (
              <div
                key={index}
                className="flex max-w-max items-center rounded-lg bg-blue-500 p-2"
              >
                <p>{category}</p>
                <AdminButton
                  className="ml-2"
                  onClick={() => handleRemoveCategories(index)}
                >
                  <MdDelete />
                </AdminButton>
              </div>
            ))}
          </div>

          <Input
            type={'text'}
            placeholder={'Додати технологію'}
            value={categoriesInput}
            onChange={(e) => setCategoriesInput(e.target.value)}
          />
          <AdminButton onClick={handleAddCategories} className="mt-3">
            Додати категорію
          </AdminButton>
        </div>
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
        {data && (
          <button
            onClick={() => setIsPublished(!isPublished)}
            className={`rounded px-4 py-2 ${
              isPublished ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            {isPublished ? 'Опубліковано' : 'Неопубліковано'}
          </button>
        )}
      </form>
    </div>
  )
}
