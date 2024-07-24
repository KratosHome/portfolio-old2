import React, { FC } from 'react'
import Head from 'next/head'

interface MainSchemaProps {
  locale: LanguageProps
}

const data = {
  uk: {
    name: 'CodeCraftMaster - Розробка програмного забезпечення',
    description:
      'Розробки веб-сайтів з складними анімаціями та цікавими рішенями, платформа для навчання молодих розробників на реальних проектах чи стартапах',
  },
  en: {
    name: 'CodeCraftMaster - Software development',
    description:
      'Developing websites with complex animations and interesting solutions. A platform for training young developers on real projects or startups.',
  },
  fr: {
    name: 'CodeCraftMaster - Développement de logiciels',
    description:
      'Développement de sites web avec des animations complexes et des solutions intéressantes. Une plateforme pour former les jeunes développeurs sur des projets réels ou des startups.',
  },
}

const HomeSnippets: FC<MainSchemaProps> = ({ locale }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Professional Service',
    name: data[locale]?.name || data.en.name,
    image: 'https://codecraftmaster.com/logo.png',
    description: data[locale]?.description || data.en.description,
    url: 'https://codecraftmaster.com',
    areaServed: ['USA', 'Canada', 'Україна', 'Світ'],
    founder: {
      '@type': 'Person',
      name: 'Олег Ткач',
      url: 'https://codecraftmaster.com',
    },
    sameAs: [
      'https://www.linkedin.com/in/olegtkach101/',
      'https://t.me/KratosHome',
      'https://github.com/KratosHome',
    ],
    logo: 'https://codecraftmaster.com/logo.png',
    openingHours: 'Mo-Fr 09:00-17:00',
  }

  return (
    <Head>
      <link rel="preload" as="font" crossOrigin="" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  )
}

export default HomeSnippets
