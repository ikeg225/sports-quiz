export interface Post {
    _id: string,
    title: string,
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