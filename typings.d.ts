export interface Post {
    _id: string,
    title: string,
    id: string,
    mainImage: {
        asset: {
            _ref: string
        }
    },
    slug: {
        current: string
    },
    body: object[]
}