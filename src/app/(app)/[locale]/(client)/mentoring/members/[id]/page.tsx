import React from 'react'
import { getTranslations } from 'next-intl/server'

const Page = async () => {
  const t = await getTranslations('user-diz')

  return (
    <div className="background-item-no-hover mx-auto mt-12 max-w-[1442px] rounded-xl">
      <div className="mb-8 py-5 text-center">
        <h1 className="mb-4 text-3xl font-bold">{t('Designer Page')}</h1>
        <p className="text-lg">
          {t('You can create your own designer page and add it here')}.
        </p>
      </div>

      <div className="mb-6 text-center">
        <a
          href="https://github.com/KratosHome/portfolio"
          className="text-lg text-blue-500 hover:underline"
        >
          {t('View repository on GitHub')}
        </a>
        <p className="text-gray-600">{t('Submit your pull requests')}</p>
      </div>

      <div className="rounded-lg p-6 shadow">
        <h2 className="mb-4 text-2xl font-semibold text-gray-400">
          {t('Rules')}:
        </h2>
        <ul className="list-inside list-disc space-y-2 text-gray-400">
          <li>{t('Use data from the admin panel if available')}.</li>
          <li>{t('The code should be clean and understandable to others')}.</li>
          <li>{t('You can add necessary libraries to solve tasks')}.</li>
        </ul>
      </div>
    </div>
  )
}

export default Page
