import { getServerSideSitemapIndex } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { numOfCollections } from '../api/mongo'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const sitemaps = []
    const limit = 10000

    const number = await numOfCollections()
    const numberOfSitemaps = Math.floor(number / limit) + 1

    for (let i = 1; i <= numberOfSitemaps; i++) {
        sitemaps.push(`https://sportsquiz.org/server-sitemap/${i * limit}.xml`)
    }

    return getServerSideSitemapIndex(ctx, sitemaps)
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}