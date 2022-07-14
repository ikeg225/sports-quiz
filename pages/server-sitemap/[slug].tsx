import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { getRange } from '../api/mongo'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const limit = 10000
    const slug = ctx.req.url
    const found = slug ? slug.match(/^\/server-sitemap\/(\d+)\.xml$/) : null

    if (found) {
        const number = parseInt(found[1])
        const skip = number - limit > 0 ?  number - limit : 0

        const allIDs = await getRange(skip, limit)
        const fields = []

        for (let i = 0; i < allIDs.length; i++) {
            fields.push({
                loc: `https://sportsquiz.org/basketball/${allIDs[i]}`, 
                lastmod: new Date().toISOString(),
                changefreq: 'daily',
                priority: 0.7
            })
        }

        ctx.res.setHeader("Content-Type", "text/xml");
        ctx.res.write(await getServerSideSitemap(ctx, fields));
        ctx.res.end();
    }

    return {
        props: {},
    };
}

export default function Sitemap() {}