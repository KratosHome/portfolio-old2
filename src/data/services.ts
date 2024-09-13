import astro from '@/assets/technologies/astro-dark.svg'
import react from '@/assets/technologies/ReactLogo.svg'
import vue from '@/assets/technologies/vue.svg'
import next from '@/assets/technologies/NextLogo.svg'
import gsap from '@/assets/technologies/gsap-greensock.svg'
import electron from '@/assets/technologies/electron.svg'
import googleSurveys from '@/assets/technologies/google-surveys.svg'
import googleAnalytics from '@/assets/technologies/google-analytics.svg'
import strapi from '@/assets/technologies/StrapiLogo.svg'

const servicesDataUa = [
  {
    id: 1,
    title: 'Веб застосунок',
    description:
      'Створюю сучасні веб-застосунки з React та Vue для ефективних, швидких та великих рішень.',
    icon: [
      {
        id: 1,
        alt: 'React JS',
        icon: react,
      },
      {
        id: 2,
        alt: 'Vue JS',
        icon: vue,
      },
    ],
  },
  {
    id: 2,
    title: 'E-commerce проект',
    description:
      'Розробляю потужні e-commerce проекти з використанням Next, Astro, GSAP та Strapi.',
    icon: [
      {
        id: 1,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 2,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 3,
        alt: 'GSAP',
        icon: gsap,
      },
      {
        id: 4,
        alt: 'Strapi',
        icon: strapi,
      },
    ],
  },
  {
    id: 3,
    title: 'Застосунок для iOS та Android',
    description:
      'Створюю кроссплатформенні мобільні застосунки з React Native для iOS та Android.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
    ],
  },
  {
    id: 4,
    title: 'Застосунок для Mac та Windows',
    description:
      'Розробляю потужні десктопні застосунки з React Native та Electron.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
      {
        id: 2,
        alt: 'Electron',
        icon: electron,
      },
    ],
  },
  {
    id: 5,
    title: 'Оптимізація продуктивності',
    description:
      'Оптимізую продуктивність з використанням Google Analytics та Similar Web.',
    icon: [
      {
        id: 1,
        alt: 'Google Analytics',
        icon: googleAnalytics,
      },
      {
        id: 2,
        alt: 'Similar Web',
        icon: googleSurveys,
      },
    ],
  },
  {
    id: 6,
    title: 'Менторинг',
    description:
      'Надаю професійний менторинг з технологій React, Next, Veu, Astro та GSAP.',
    icon: [
      {
        id: 1,
        alt: 'React',
        icon: react,
      },
      {
        id: 2,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 3,
        alt: 'Vue JS',
        icon: vue,
      },
      {
        id: 4,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 5,
        alt: 'GSAP',
        icon: gsap,
      },
    ],
  },
]

const servicesDataEn = [
  {
    id: 1,
    title: 'Web Application',
    description:
      'I create modern web applications with React and Vue for efficient, fast, and large-scale solutions.',
    icon: [
      {
        id: 1,
        alt: 'React JS',
        icon: react,
      },
      {
        id: 2,
        alt: 'Vue JS',
        icon: vue,
      },
    ],
  },
  {
    id: 2,
    title: 'E-commerce Project',
    description:
      'I develop powerful e-commerce projects using Next, Astro, GSAP, and Strapi.',
    icon: [
      {
        id: 1,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 2,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 3,
        alt: 'GSAP',
        icon: gsap,
      },
      {
        id: 4,
        alt: 'Strapi',
        icon: strapi,
      },
    ],
  },
  {
    id: 3,
    title: 'iOS and Android Application',
    description:
      'I create cross-platform mobile applications with React Native for iOS and Android.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
    ],
  },
  {
    id: 4,
    title: 'Mac and Windows Application',
    description:
      'I develop powerful desktop applications with React Native and Electron.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
      {
        id: 2,
        alt: 'Electron',
        icon: electron,
      },
    ],
  },
  {
    id: 5,
    title: 'Performance Optimization',
    description:
      'I optimize performance using Google Analytics and Similar Web.',
    icon: [
      {
        id: 1,
        alt: 'Google Analytics',
        icon: googleAnalytics,
      },
      {
        id: 2,
        alt: 'Similar Web',
        icon: googleSurveys,
      },
    ],
  },
  {
    id: 6,
    title: 'Mentoring',
    description:
      'I provide professional mentoring in React, Next, Vue, Astro, and GSAP technologies.',
    icon: [
      {
        id: 1,
        alt: 'React',
        icon: react,
      },
      {
        id: 2,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 3,
        alt: 'Vue JS',
        icon: vue,
      },
      {
        id: 4,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 5,
        alt: 'GSAP',
        icon: gsap,
      },
    ],
  },
]

const servicesDataDe = [
  {
    id: 1,
    title: 'Webanwendung',
    description:
      'Ich erstelle moderne Webanwendungen mit React und Vue für effiziente, schnelle und groß angelegte Lösungen.',
    icon: [
      {
        id: 1,
        alt: 'React JS',
        icon: react,
      },
      {
        id: 2,
        alt: 'Vue JS',
        icon: vue,
      },
    ],
  },
  {
    id: 2,
    title: 'E-Commerce-Projekt',
    description:
      'Ich entwickle leistungsstarke E-Commerce-Projekte mit Next, Astro, GSAP und Strapi.',
    icon: [
      {
        id: 1,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 2,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 3,
        alt: 'GSAP',
        icon: gsap,
      },
      {
        id: 4,
        alt: 'Strapi',
        icon: strapi,
      },
    ],
  },
  {
    id: 3,
    title: 'iOS und Android Anwendung',
    description:
      'Ich erstelle plattformübergreifende mobile Anwendungen mit React Native für iOS und Android.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
    ],
  },
  {
    id: 4,
    title: 'Mac und Windows Anwendung',
    description:
      'Ich entwickle leistungsstarke Desktop-Anwendungen mit React Native und Electron.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
      {
        id: 2,
        alt: 'Electron',
        icon: electron,
      },
    ],
  },
  {
    id: 5,
    title: 'Leistungsoptimierung',
    description:
      'Ich optimiere die Leistung mit Google Analytics und Similar Web.',
    icon: [
      {
        id: 1,
        alt: 'Google Analytics',
        icon: googleAnalytics,
      },
      {
        id: 2,
        alt: 'Similar Web',
        icon: googleSurveys,
      },
    ],
  },
  {
    id: 6,
    title: 'Mentoring',
    description:
      'Ich biete professionelles Mentoring in den Technologien React, Next, Vue, Astro und GSAP an.',
    icon: [
      {
        id: 1,
        alt: 'React',
        icon: react,
      },
      {
        id: 2,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 3,
        alt: 'Vue JS',
        icon: vue,
      },
      {
        id: 4,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 5,
        alt: 'GSAP',
        icon: gsap,
      },
    ],
  },
]

const servicesDataEs = [
  {
    id: 1,
    title: 'Aplicación Web',
    description:
      'Creo aplicaciones web modernas con React y Vue para soluciones eficientes, rápidas y a gran escala.',
    icon: [
      {
        id: 1,
        alt: 'React JS',
        icon: react,
      },
      {
        id: 2,
        alt: 'Vue JS',
        icon: vue,
      },
    ],
  },
  {
    id: 2,
    title: 'Proyecto de E-commerce',
    description:
      'Desarrollo proyectos de e-commerce potentes utilizando Next, Astro, GSAP y Strapi.',
    icon: [
      {
        id: 1,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 2,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 3,
        alt: 'GSAP',
        icon: gsap,
      },
      {
        id: 4,
        alt: 'Strapi',
        icon: strapi,
      },
    ],
  },
  {
    id: 3,
    title: 'Aplicación para iOS y Android',
    description:
      'Creo aplicaciones móviles multiplataforma con React Native para iOS y Android.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
    ],
  },
  {
    id: 4,
    title: 'Aplicación para Mac y Windows',
    description:
      'Desarrollo aplicaciones de escritorio potentes con React Native y Electron.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
      {
        id: 2,
        alt: 'Electron',
        icon: electron,
      },
    ],
  },
  {
    id: 5,
    title: 'Optimización del Rendimiento',
    description:
      'Optimizo el rendimiento utilizando Google Analytics y Similar Web.',
    icon: [
      {
        id: 1,
        alt: 'Google Analytics',
        icon: googleAnalytics,
      },
      {
        id: 2,
        alt: 'Similar Web',
        icon: googleSurveys,
      },
    ],
  },
  {
    id: 6,
    title: 'Mentoría',
    description:
      'Ofrezco mentoría profesional en tecnologías como React, Next, Vue, Astro y GSAP.',
    icon: [
      {
        id: 1,
        alt: 'React',
        icon: react,
      },
      {
        id: 2,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 3,
        alt: 'Vue JS',
        icon: vue,
      },
      {
        id: 4,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 5,
        alt: 'GSAP',
        icon: gsap,
      },
    ],
  },
]

const servicesDataFr = [
  {
    id: 1,
    title: 'Application Web',
    description:
      'Je crée des applications web modernes avec React et Vue pour des solutions efficaces, rapides et à grande échelle.',
    icon: [
      {
        id: 1,
        alt: 'React JS',
        icon: react,
      },
      {
        id: 2,
        alt: 'Vue JS',
        icon: vue,
      },
    ],
  },
  {
    id: 2,
    title: 'Projet E-commerce',
    description:
      'Je développe des projets e-commerce puissants en utilisant Next, Astro, GSAP et Strapi.',
    icon: [
      {
        id: 1,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 2,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 3,
        alt: 'GSAP',
        icon: gsap,
      },
      {
        id: 4,
        alt: 'Strapi',
        icon: strapi,
      },
    ],
  },
  {
    id: 3,
    title: 'Application iOS et Android',
    description:
      'Je crée des applications mobiles multiplateformes avec React Native pour iOS et Android.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
    ],
  },
  {
    id: 4,
    title: 'Application Mac et Windows',
    description:
      'Je développe des applications de bureau puissantes avec React Native et Electron.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
      {
        id: 2,
        alt: 'Electron',
        icon: electron,
      },
    ],
  },
  {
    id: 5,
    title: 'Optimisation des Performances',
    description:
      "J'optimise les performances en utilisant Google Analytics et Similar Web.",
    icon: [
      {
        id: 1,
        alt: 'Google Analytics',
        icon: googleAnalytics,
      },
      {
        id: 2,
        alt: 'Similar Web',
        icon: googleSurveys,
      },
    ],
  },
  {
    id: 6,
    title: 'Mentorat',
    description:
      'Je propose un mentorat professionnel dans les technologies React, Next, Vue, Astro et GSAP.',
    icon: [
      {
        id: 1,
        alt: 'React',
        icon: react,
      },
      {
        id: 2,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 3,
        alt: 'Vue JS',
        icon: vue,
      },
      {
        id: 4,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 5,
        alt: 'GSAP',
        icon: gsap,
      },
    ],
  },
]

const servicesDataHi = [
  {
    id: 1,
    title: 'वेब एप्लिकेशन',
    description:
      'मैं React और Vue के साथ आधुनिक वेब एप्लिकेशन बनाता हूं, जो कि कुशल, तेज और बड़े पैमाने के समाधान प्रदान करते हैं।',
    icon: [
      {
        id: 1,
        alt: 'React JS',
        icon: react,
      },
      {
        id: 2,
        alt: 'Vue JS',
        icon: vue,
      },
    ],
  },
  {
    id: 2,
    title: 'ई-कॉमर्स प्रोजेक्ट',
    description:
      'मैं Next, Astro, GSAP और Strapi का उपयोग करके शक्तिशाली ई-कॉमर्स प्रोजेक्ट्स विकसित करता हूं।',
    icon: [
      {
        id: 1,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 2,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 3,
        alt: 'GSAP',
        icon: gsap,
      },
      {
        id: 4,
        alt: 'Strapi',
        icon: strapi,
      },
    ],
  },
  {
    id: 3,
    title: 'iOS और Android एप्लिकेशन',
    description:
      'मैं React Native के साथ iOS और Android के लिए क्रॉस-प्लेटफॉर्म मोबाइल एप्लिकेशन बनाता हूं।',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
    ],
  },
  {
    id: 4,
    title: 'Mac और Windows एप्लिकेशन',
    description:
      'मैं React Native और Electron के साथ शक्तिशाली डेस्कटॉप एप्लिकेशन विकसित करता हूं।',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
      {
        id: 2,
        alt: 'Electron',
        icon: electron,
      },
    ],
  },
  {
    id: 5,
    title: 'प्रदर्शन अनुकूलन',
    description:
      'मैं Google Analytics और Similar Web का उपयोग करके प्रदर्शन को अनुकूलित करता हूं।',
    icon: [
      {
        id: 1,
        alt: 'Google Analytics',
        icon: googleAnalytics,
      },
      {
        id: 2,
        alt: 'Similar Web',
        icon: googleSurveys,
      },
    ],
  },
  {
    id: 6,
    title: 'मेंटरिंग',
    description:
      'मैं React, Next, Vue, Astro और GSAP तकनीकों में पेशेवर मेंटरिंग प्रदान करता हूं।',
    icon: [
      {
        id: 1,
        alt: 'React',
        icon: react,
      },
      {
        id: 2,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 3,
        alt: 'Vue JS',
        icon: vue,
      },
      {
        id: 4,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 5,
        alt: 'GSAP',
        icon: gsap,
      },
    ],
  },
]

const servicesDataIt = [
  {
    id: 1,
    title: 'Applicazione Web',
    description:
      'Creo applicazioni web moderne con React e Vue per soluzioni efficienti, veloci e su larga scala.',
    icon: [
      {
        id: 1,
        alt: 'React JS',
        icon: react,
      },
      {
        id: 2,
        alt: 'Vue JS',
        icon: vue,
      },
    ],
  },
  {
    id: 2,
    title: 'Progetto E-commerce',
    description:
      'Sviluppo potenti progetti di e-commerce utilizzando Next, Astro, GSAP e Strapi.',
    icon: [
      {
        id: 1,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 2,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 3,
        alt: 'GSAP',
        icon: gsap,
      },
      {
        id: 4,
        alt: 'Strapi',
        icon: strapi,
      },
    ],
  },
  {
    id: 3,
    title: 'Applicazione per iOS e Android',
    description:
      'Creo applicazioni mobili multipiattaforma con React Native per iOS e Android.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
    ],
  },
  {
    id: 4,
    title: 'Applicazione per Mac e Windows',
    description:
      'Sviluppo potenti applicazioni desktop con React Native ed Electron.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
      {
        id: 2,
        alt: 'Electron',
        icon: electron,
      },
    ],
  },
  {
    id: 5,
    title: 'Ottimizzazione delle Prestazioni',
    description:
      'Ottimizzo le prestazioni utilizzando Google Analytics e Similar Web.',
    icon: [
      {
        id: 1,
        alt: 'Google Analytics',
        icon: googleAnalytics,
      },
      {
        id: 2,
        alt: 'Similar Web',
        icon: googleSurveys,
      },
    ],
  },
  {
    id: 6,
    title: 'Mentoring',
    description:
      'Offro mentoring professionale nelle tecnologie React, Next, Vue, Astro e GSAP.',
    icon: [
      {
        id: 1,
        alt: 'React',
        icon: react,
      },
      {
        id: 2,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 3,
        alt: 'Vue JS',
        icon: vue,
      },
      {
        id: 4,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 5,
        alt: 'GSAP',
        icon: gsap,
      },
    ],
  },
]

const servicesDataJa = [
  {
    id: 1,
    title: 'ウェブアプリケーション',
    description:
      'ReactとVueを使用して、効率的で迅速かつ大規模なソリューションのための最新のウェブアプリケーションを作成します。',
    icon: [
      {
        id: 1,
        alt: 'React JS',
        icon: react,
      },
      {
        id: 2,
        alt: 'Vue JS',
        icon: vue,
      },
    ],
  },
  {
    id: 2,
    title: 'Eコマースプロジェクト',
    description:
      'Next、Astro、GSAP、Strapiを使用して強力なEコマースプロジェクトを開発します。',
    icon: [
      {
        id: 1,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 2,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 3,
        alt: 'GSAP',
        icon: gsap,
      },
      {
        id: 4,
        alt: 'Strapi',
        icon: strapi,
      },
    ],
  },
  {
    id: 3,
    title: 'iOSおよびAndroidアプリケーション',
    description:
      'React Nativeを使用してiOSおよびAndroid向けのクロスプラットフォームモバイルアプリケーションを作成します。',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
    ],
  },
  {
    id: 4,
    title: 'MacおよびWindowsアプリケーション',
    description:
      'React NativeとElectronを使用して強力なデスクトップアプリケーションを開発します。',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
      {
        id: 2,
        alt: 'Electron',
        icon: electron,
      },
    ],
  },
  {
    id: 5,
    title: 'パフォーマンス最適化',
    description:
      'Google AnalyticsとSimilar Webを使用してパフォーマンスを最適化します。',
    icon: [
      {
        id: 1,
        alt: 'Google Analytics',
        icon: googleAnalytics,
      },
      {
        id: 2,
        alt: 'Similar Web',
        icon: googleSurveys,
      },
    ],
  },
  {
    id: 6,
    title: 'メンタリング',
    description:
      'React、Next、Vue、Astro、GSAPの技術に関するプロフェッショナルなメンタリングを提供します。',
    icon: [
      {
        id: 1,
        alt: 'React',
        icon: react,
      },
      {
        id: 2,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 3,
        alt: 'Vue JS',
        icon: vue,
      },
      {
        id: 4,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 5,
        alt: 'GSAP',
        icon: gsap,
      },
    ],
  },
]

const servicesDataKo = [
  {
    id: 1,
    title: '웹 애플리케이션',
    description:
      'React와 Vue를 사용하여 효율적이고 빠르며 대규모 솔루션을 위한 현대적인 웹 애플리케이션을 만듭니다.',
    icon: [
      {
        id: 1,
        alt: 'React JS',
        icon: react,
      },
      {
        id: 2,
        alt: 'Vue JS',
        icon: vue,
      },
    ],
  },
  {
    id: 2,
    title: '전자상거래 프로젝트',
    description:
      'Next, Astro, GSAP, Strapi를 사용하여 강력한 전자상거래 프로젝트를 개발합니다.',
    icon: [
      {
        id: 1,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 2,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 3,
        alt: 'GSAP',
        icon: gsap,
      },
      {
        id: 4,
        alt: 'Strapi',
        icon: strapi,
      },
    ],
  },
  {
    id: 3,
    title: 'iOS 및 Android 애플리케이션',
    description:
      'React Native를 사용하여 iOS 및 Android용 크로스 플랫폼 모바일 애플리케이션을 만듭니다.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
    ],
  },
  {
    id: 4,
    title: 'Mac 및 Windows 애플리케이션',
    description:
      'React Native와 Electron을 사용하여 강력한 데스크톱 애플리케이션을 개발합니다.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
      {
        id: 2,
        alt: 'Electron',
        icon: electron,
      },
    ],
  },
  {
    id: 5,
    title: '성능 최적화',
    description:
      'Google Analytics와 Similar Web을 사용하여 성능을 최적화합니다.',
    icon: [
      {
        id: 1,
        alt: 'Google Analytics',
        icon: googleAnalytics,
      },
      {
        id: 2,
        alt: 'Similar Web',
        icon: googleSurveys,
      },
    ],
  },
  {
    id: 6,
    title: '멘토링',
    description:
      'React, Next, Vue, Astro, GSAP 기술에 대한 전문적인 멘토링을 제공합니다.',
    icon: [
      {
        id: 1,
        alt: 'React',
        icon: react,
      },
      {
        id: 2,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 3,
        alt: 'Vue JS',
        icon: vue,
      },
      {
        id: 4,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 5,
        alt: 'GSAP',
        icon: gsap,
      },
    ],
  },
]

const servicesDataPt = [
  {
    id: 1,
    title: 'Aplicação Web',
    description:
      'Crio aplicações web modernas com React e Vue para soluções eficientes, rápidas e de grande escala.',
    icon: [
      {
        id: 1,
        alt: 'React JS',
        icon: react,
      },
      {
        id: 2,
        alt: 'Vue JS',
        icon: vue,
      },
    ],
  },
  {
    id: 2,
    title: 'Projeto E-commerce',
    description:
      'Desenvolvo projetos de e-commerce poderosos utilizando Next, Astro, GSAP e Strapi.',
    icon: [
      {
        id: 1,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 2,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 3,
        alt: 'GSAP',
        icon: gsap,
      },
      {
        id: 4,
        alt: 'Strapi',
        icon: strapi,
      },
    ],
  },
  {
    id: 3,
    title: 'Aplicação para iOS e Android',
    description:
      'Crio aplicações móveis multiplataforma com React Native para iOS e Android.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
    ],
  },
  {
    id: 4,
    title: 'Aplicação para Mac e Windows',
    description:
      'Desenvolvo aplicações de desktop poderosas com React Native e Electron.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
      {
        id: 2,
        alt: 'Electron',
        icon: electron,
      },
    ],
  },
  {
    id: 5,
    title: 'Otimização de Desempenho',
    description:
      'Otimizo o desempenho utilizando Google Analytics e Similar Web.',
    icon: [
      {
        id: 1,
        alt: 'Google Analytics',
        icon: googleAnalytics,
      },
      {
        id: 2,
        alt: 'Similar Web',
        icon: googleSurveys,
      },
    ],
  },
  {
    id: 6,
    title: 'Mentoria',
    description:
      'Ofereço mentoria profissional em tecnologias como React, Next, Vue, Astro e GSAP.',
    icon: [
      {
        id: 1,
        alt: 'React',
        icon: react,
      },
      {
        id: 2,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 3,
        alt: 'Vue JS',
        icon: vue,
      },
      {
        id: 4,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 5,
        alt: 'GSAP',
        icon: gsap,
      },
    ],
  },
]

const servicesDataSv = [
  {
    id: 1,
    title: 'Webbapplikation',
    description:
      'Jag skapar moderna webbapplikationer med React och Vue för effektiva, snabba och storskaliga lösningar.',
    icon: [
      {
        id: 1,
        alt: 'React JS',
        icon: react,
      },
      {
        id: 2,
        alt: 'Vue JS',
        icon: vue,
      },
    ],
  },
  {
    id: 2,
    title: 'E-handelsprojekt',
    description:
      'Jag utvecklar kraftfulla e-handelsprojekt med Next, Astro, GSAP och Strapi.',
    icon: [
      {
        id: 1,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 2,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 3,
        alt: 'GSAP',
        icon: gsap,
      },
      {
        id: 4,
        alt: 'Strapi',
        icon: strapi,
      },
    ],
  },
  {
    id: 3,
    title: 'iOS och Android-applikation',
    description:
      'Jag skapar plattformsoberoende mobilapplikationer med React Native för iOS och Android.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
    ],
  },
  {
    id: 4,
    title: 'Mac och Windows-applikation',
    description:
      'Jag utvecklar kraftfulla skrivbordsapplikationer med React Native och Electron.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
      {
        id: 2,
        alt: 'Electron',
        icon: electron,
      },
    ],
  },
  {
    id: 5,
    title: 'Prestandaoptimering',
    description:
      'Jag optimerar prestanda med hjälp av Google Analytics och Similar Web.',
    icon: [
      {
        id: 1,
        alt: 'Google Analytics',
        icon: googleAnalytics,
      },
      {
        id: 2,
        alt: 'Similar Web',
        icon: googleSurveys,
      },
    ],
  },
  {
    id: 6,
    title: 'Mentorskap',
    description:
      'Jag erbjuder professionellt mentorskap inom teknologier som React, Next, Vue, Astro och GSAP.',
    icon: [
      {
        id: 1,
        alt: 'React',
        icon: react,
      },
      {
        id: 2,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 3,
        alt: 'Vue JS',
        icon: vue,
      },
      {
        id: 4,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 5,
        alt: 'GSAP',
        icon: gsap,
      },
    ],
  },
]

const servicesDataZh = [
  {
    id: 1,
    title: '网络应用',
    description:
      '我使用 React 和 Vue 创建现代化的网络应用，提供高效、快速和大规模的解决方案。',
    icon: [
      {
        id: 1,
        alt: 'React JS',
        icon: react,
      },
      {
        id: 2,
        alt: 'Vue JS',
        icon: vue,
      },
    ],
  },
  {
    id: 2,
    title: '电子商务项目',
    description: '我使用 Next、Astro、GSAP 和 Strapi 开发强大的电子商务项目。',
    icon: [
      {
        id: 1,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 2,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 3,
        alt: 'GSAP',
        icon: gsap,
      },
      {
        id: 4,
        alt: 'Strapi',
        icon: strapi,
      },
    ],
  },
  {
    id: 3,
    title: 'iOS 和 Android 应用',
    description:
      '我使用 React Native 创建适用于 iOS 和 Android 的跨平台移动应用。',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
    ],
  },
  {
    id: 4,
    title: 'Mac 和 Windows 应用',
    description: '我使用 React Native 和 Electron 开发强大的桌面应用程序。',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
      {
        id: 2,
        alt: 'Electron',
        icon: electron,
      },
    ],
  },
  {
    id: 5,
    title: '性能优化',
    description: '我使用 Google Analytics 和 Similar Web 进行性能优化。',
    icon: [
      {
        id: 1,
        alt: 'Google Analytics',
        icon: googleAnalytics,
      },
      {
        id: 2,
        alt: 'Similar Web',
        icon: googleSurveys,
      },
    ],
  },
  {
    id: 6,
    title: '指导',
    description: '我提供 React、Next、Vue、Astro 和 GSAP 技术的专业指导。',
    icon: [
      {
        id: 1,
        alt: 'React',
        icon: react,
      },
      {
        id: 2,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 3,
        alt: 'Vue JS',
        icon: vue,
      },
      {
        id: 4,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 5,
        alt: 'GSAP',
        icon: gsap,
      },
    ],
  },
]

export const servicesData = {
  de: servicesDataDe,
  en: servicesDataEn,
  es: servicesDataEs,
  fr: servicesDataFr,
  hi: servicesDataHi,
  it: servicesDataIt,
  ja: servicesDataJa,
  ko: servicesDataKo,
  pt: servicesDataPt,
  sv: servicesDataSv,
  uk: servicesDataUa,
  zh: servicesDataZh,
}
