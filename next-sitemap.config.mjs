/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://sportsquiz.org',
    generateRobotsTxt: true,
    exclude: ['/server-sitemap-index.xml'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://sportsquiz.org/server-sitemap-index.xml'
        ],
    },
}

export default config