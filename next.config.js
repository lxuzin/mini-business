/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/mini-business',
    images: {
        unoptimized: true,
    },
    distDir: 'docs',
}

module.exports = nextConfig
