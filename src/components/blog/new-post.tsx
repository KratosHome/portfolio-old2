import { useState, useEffect, ChangeEvent } from 'react'
import ReactQuill from 'react-quill'
import { useSession } from 'next-auth/react'
import useFetchUser from '@/hooks/useFetchUser'
import { AdminButton } from '@/components/UI/admin-button/admin-button'
import { createPostServer } from '@/server/blog/create-post.server'
import { toast } from 'react-toastify'
import { convertToBase64 } from '@/utils/convertToBase64'

const CustomToolbar = () => (
  <div id="toolbar" className="flex space-x-2 rounded-t-lg bg-gray-100 p-2">
    <button className="ql-bold">B</button>
    <button className="ql-italic">I</button>
    <button className="ql-underline">U</button>
    <button className="ql-list" value="ordered"></button>
    <button className="ql-list" value="bullet"></button>
    <select className="ql-header">
      <option value="1"></option>
      <option value="2"></option>
      <option value="3"></option>
      <option value="4"></option>
      <option value="5"></option>
      <option value="6"></option>
      <option value=""></option>
    </select>
    <button className="ql-image"></button>
  </div>
)

type LanguageProps = 'uk' | 'en' | 'fr'

interface PostData {
  authorId: string
  title: string
  keywords: string[]
  category: string[]
  shortDescription: string
  description: string
  link: string
  local: LanguageProps
}

export const NewPost = () => {
  const { data: session }: any = useSession()
  const userData = useFetchUser(session)

  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeLanguage, setActiveLanguage] = useState<LanguageProps>('uk')
  const [postsData, setPostsData] = useState<{
    [key in LanguageProps]: PostData
  }>({
    uk: {
      authorId: '',
      title: '',
      keywords: [],
      category: [],
      shortDescription: '',
      description: '',
      link: '',
      local: 'uk',
    },
    en: {
      authorId: '',
      title: '',
      keywords: [],
      category: [],
      shortDescription: '',
      description: '',
      link: '',
      local: 'en',
    },
    fr: {
      authorId: '',
      title: '',
      keywords: [],
      category: [],
      shortDescription: '',
      description: '',
      link: '',
      local: 'fr',
    },
  })

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
    if (field === 'keywords' || field === 'category') {
      setPostsData((prev) => ({
        ...prev,
        [activeLanguage]: {
          ...prev[activeLanguage],
          [field]: value.split(',').map((item) => item.trim()),
        },
      }))
    } else if (field === 'link') {
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

  const handleContentChange = (value: string) => {
    setPostsData((prev) => ({
      ...prev,
      [activeLanguage]: {
        ...prev[activeLanguage],
        description: value,
      },
    }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const sendPost = async () => {
    setLoading(true)

    let imageBase64 = null
    if (image) {
      imageBase64 = await convertToBase64(image)
    }

    const result = await createPostServer({
      data: postsData,
      image: imageBase64,
    })

    if (result.success) {
      toast(`Пост створено`, {
        type: 'success',
      })
    } else {
      toast(`Помилка при створенні поста`, {
        type: 'error',
      })
    }

    setLoading(false)
  }

  return (
    <div>
      <input
        placeholder="посилання"
        className="mb-4 w-full rounded border p-2"
        value={postsData[activeLanguage].link}
        onChange={(e) => handleInputChange(e, 'link')}
      />
      <input
        className="file-input__create-post"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <div className="mb-4 flex space-x-4">
        {(['uk', 'en', 'fr'] as LanguageProps[]).map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`rounded px-4 py-2 ${
              activeLanguage === lang ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
      <CustomToolbar />
      <input
        placeholder="Заголовок"
        className="mb-4 w-full rounded border p-2"
        value={postsData[activeLanguage].title}
        onChange={(e) => handleInputChange(e, 'title')}
      />
      <input
        placeholder="Ключові слова"
        className="mb-4 w-full rounded border p-2"
        value={postsData[activeLanguage].keywords.join(', ')}
        onChange={(e) => handleInputChange(e, 'keywords')}
      />
      <input
        placeholder="Категорії"
        className="mb-4 w-full rounded border p-2"
        value={postsData[activeLanguage].category.join(', ')}
        onChange={(e) => handleInputChange(e, 'category')}
      />
      <input
        placeholder="Короткий заголовок"
        className="mb-4 w-full rounded border p-2"
        value={postsData[activeLanguage].shortDescription}
        onChange={(e) => handleInputChange(e, 'shortDescription')}
      />
      <ReactQuill
        theme="snow"
        placeholder="Стаття"
        value={postsData[activeLanguage].description}
        onChange={handleContentChange}
        modules={{ toolbar: { container: '#toolbar' } }}
        className="h-full w-full rounded-b-lg border border-gray-300 bg-white p-2 text-black shadow-sm"
      />
      <AdminButton onClick={sendPost} disabled={loading}>
        Зберегти
      </AdminButton>
    </div>
  )
}
