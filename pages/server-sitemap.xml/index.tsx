import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { getAllIDs } from '../api/mongo'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const allIDs = await getAllIDs()
    const fields = []

    for (let i = 0; i < allIDs.length; i++) {
        fields.push({
            loc: `https://sportsquiz.org/basketball/${allIDs[i]}`, 
            lastmod: new Date().toISOString(),
            priority: 0.7
        })
    }

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}