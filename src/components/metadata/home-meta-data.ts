const data = {
  uk: {
    canonicalUrl: 'https://codecraftmaster.com/ua',
    title: 'Розробка веб додатків, e-commerce | codecraftmaster.com',
    description:
      'Розробка веб-сайтів з складними анімаціями та цікавими рішеннями. Платформа для навчання молодих розробників на реальних проектах.',
    keywords: [
      'веб-розробка',
      'розробка веб-сайтів',
      'розробка програмного забезпечення',
      'е-комерція',
      'мобільна розробка',
      'розробка мобільних додатків',
      'розробка інтернет-магазинів',
      'Next.js',
      'React',
      'JavaScript',
      'програмування на JavaScript',
      'фронтенд розробка',
      'Apple розробник',
    ],
    authors: [{ name: 'Олег Ткач', url: 'https://codecraftmaster.com' }],
    openGraph: {
      title: 'Веб розробка | CodeCraftMaster.com',
      description:
        'Розробка веб-сайтів з складними анімаціями та цікавими рішеннями. Платформа для навчання молодих розробників на реальних проектах.',
      locale: 'uk_UA',
    },
  },
  en: {
    canonicalUrl: 'https://codecraftmaster.com/en',
    title: 'Developing web apps, e-commerce | codecraftmaster.com',
    description:
      'Developing websites with complex animations and interesting solutions. A platform for training young developers on real projects or startups.',
    keywords: [
      'software development',
      'web development',
      'web app',
      'e-commerce development',
      'e-commerce',
      'website creation',
      'mobile development',
      'Next.js',
      'React',
      'JavaScript',
      'mobile app development',
      'JavaScript programming',
      'software development',
      'frontend development',
      'Apple development',
    ],
    authors: [{ name: 'Oleg Tkach', url: 'https://codecraftmaster.com' }],
    openGraph: {
      title: 'Web development | CodeCraftMaster.com',
      description:
        'Developing websites with complex animations and interesting solutions. A platform for training young developers on real projects or startups.',
      locale: 'en_US',
    },
  },
  fr: {
    canonicalUrl: 'https://codecraftmaster.com/fr',
    title: "Développement d'applications web, e-commerce | codecraftmaster.com",
    description:
      'Développement de sites web avec des animations complexes et des solutions intéressantes. Une plateforme pour former les jeunes développeurs sur des projets réels ou des startups.',
    keywords: [
      'développement logiciel',
      'développement web',
      'application web',
      'développement e-commerce',
      'e-commerce',
      'création de sites web',
      'développement mobile',
      'Next.js',
      'React',
      'JavaScript',
      "développement d'applications mobiles",
      'programmation JavaScript',
      'développement frontend',
      'développement Apple',
    ],
    authors: [{ name: 'Oleg Tkach', url: 'https://codecraftmaster.com' }],
    openGraph: {
      title: 'Développement web | CodeCraftMaster.com',
      description:
        'Développement de sites web avec des animations complexes et des solutions intéressantes. Une plateforme pour former les jeunes développeurs sur des projets réels ou des startups.',
      locale: 'fr_FR',
    },
  },
}

function Metadata(lang: LanguageProps) {
  const langData = data[lang]

  return {
    title: langData.title,
    description: langData.description,
    keywords: langData.keywords,
    authors: langData.authors,
    creator: 'Oleg Tkach',
    publisher: 'Oleg Tkach',
    openGraph: {
      title: langData.openGraph.title,
      description: langData.openGraph.description,
      url: langData.canonicalUrl,
      siteName: 'CodeCraftMaster.com',
      images: [
        {
          url: 'https://codecraftmaster.com/logo.png',
          width: 800,
          height: 600,
          alt:
            lang === 'uk'
              ? 'Логотип CodeCraftMaster'
              : lang === 'en'
                ? 'CodeCraftMaster Logo'
                : 'Logo CodeCraftMaster',
        },
      ],
      locale: langData.openGraph.locale,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    },
    metadataBase: new URL('https://codecraftmaster.com'),
    alternates: {
      canonical: langData.canonicalUrl,
      languages: {
        'en-US': '/en',
        'uk-UA': '/ua',
        'fr-FR': '/fr',
      },
    },
    icons: {
      icon: '/logo.png',
      shortcut: '/logo.png',
      apple: '/logo.png',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    },
  }
}

export default Metadata
