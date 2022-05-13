export interface Post {
    _id: string,
    title: string,
    id: string,
    outbound: string,
    mainImage: {
        asset: {
            _ref: string
        }
    },
    slug: {
        current: string
    },
    body: object[],
    publishedAt: string,
    quiztype: string,
    meta: string
}