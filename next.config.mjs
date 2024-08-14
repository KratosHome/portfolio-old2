import createNextIntlPlugin from "next-intl/plugin";
import * as NextMdx from '@next/mdx';

const withNextIntl = createNextIntlPlugin();
const withMDX = NextMdx.default({
    extension: /\.mdx?$/,
    options: {
        // налаштування remarkPlugins або інші опції
    },
});


const nextConfig = {
    runtime: 'nodejs',
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    images: {
        formats: ["image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
            },
        ],
    },
    env: {
        NEXT_URL: process.env.NEXT_URL,
        NEXT_MONGO_DB: process.env.NEXT_MONGO_DB,
        NEXT_GTM_ID: process.env.NEXT_GTM_ID,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    }
};

export default withNextIntl(withMDX(nextConfig));
