import { FC } from 'react'
import Head from 'next/head'
import { homeJsonLd } from '@/data/jsonLd/home'

interface MainSchemaProps {
  locale: LanguageProps
}

const HomeSnippets: FC<MainSchemaProps> = ({ locale }) => {
  const localizationData = homeJsonLd[locale]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: localizationData.name,
    image: 'https://codecraftmaster.com/logo.png',
    description: localizationData.description,
    url: 'https://codecraftmaster.com',
    areaServed: localizationData.areaServed,
    founder: {
      '@type': 'Person',
      name: localizationData.userName,
      url: 'https://codecraftmaster.com',
      jobTitle: localizationData.founderTitle,
    },
    sameAs: [
      'https://www.linkedin.com/in/olegtkach101/',
      'https://t.me/KratosHome',
      'https://github.com/KratosHome',
    ],
    logo: 'https://codecraftmaster.com/logo.png',
    openingHours: 'Mo-Fr 09:00-17:00',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: localizationData.contactType,
      areaServed: localizationData.areaServed.join(', '),
      availableLanguage: localizationData.availableLanguage,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: localizationData.addressLocality,
      addressCountry: localizationData.addressCountry,
    },
    keywords: localizationData.keywords,
    makesOffer: {
      '@type': 'Offer',
      url: 'https://codecraftmaster.com/services',
      description: localizationData.offerDescription,
      priceCurrency: 'USD',
      price: '100',
      eligibleRegion: localizationData.areaServed,
      availability: 'https://schema.org/InStock',
    },
    memberOf: {
      '@type': 'Organization',
      name: 'CodeCraftMaster Community',
      url: 'https://codecraftmaster.com/community',
    },
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  )
}

export default HomeSnippets
