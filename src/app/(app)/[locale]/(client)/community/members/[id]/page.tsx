import React from 'react'

const Page = () => {
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">Ім&apos;я:</h1>
          <p className="mb-4 text-lg text-gray-600">
            Проєкт: <a className="text-blue-500 hover:underline">ів сч с</a>
          </p>
          <div className="rounded-lg bg-gray-100 p-4 text-sm text-gray-800">
            <h2 className="mb-2 text-xl font-semibold">Правила:</h2>
            <ol className="ml-5 list-decimal">
              <li>Використовуйте дані з бази, якщо вони вже є.</li>
              <li>Код повинен бути зрозумілим і читабельним.</li>
              <li>
                Додавайте будь-які бібліотеки для вирішення задач, і посилання
                на GitHub.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
