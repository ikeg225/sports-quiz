/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://sportsquiz.org',
    generateRobotsTxt: true,
    exclude: ['/server-sitemap.xml'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://sportsquiz.org/server-sitemap.xml'
        ],
    },
}

export default config  