import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: [
          '/*?sort=*',
          '/*?new=*',
          '/*?filters=*',
          '/*?comments=*',
          '/*?technologies',
          '/*?authors',
        ],
        allow: [
          '/',
          '/*/privacy-policy/',
          '/*/blog/',
          '/*/blog/*',
          '/*/community/projects*',
          '/*/community/members*',
        ],
      },
    ],
    sitemap: 'https://codecraftmaster.com/sitemap.xml',
  }
}
