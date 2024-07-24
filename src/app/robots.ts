import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                disallow: [
                    '/*?*sort=',
                    '/*?*new=',
                    '/blog/*?*filter=',
                    '/articles/*?*comments='
                ],
                allow: ['/', '/blog/', '/blog/*'],
            },
        ],
        sitemap: 'https://codecraftmaster.com/sitemap.xml',
    }
}
