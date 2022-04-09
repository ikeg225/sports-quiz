import { sanityClient, urlFor } from "../../sanity"
import Head from 'next/head'
import Header from "../../components/Header"
import { Post } from '../../typings'
import { GetStaticProps } from "next";

interface Props {
    post: Post;
}

function Post({ post }: Props) {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="md:mx-5" id="outer-container">
                <Head>
                <title>Sports Quiz</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="preload"
                    href="/fonts/Oswald-Bold.ttf"
                    as="font"
                    crossOrigin=""
                    />
                </Head>
                <Header />
                <main id="page-wrap">
                    <h1>{post.title}</h1>
                </main>
            </div>
        </div>
    )
}

export default Post;

export const getStaticPaths = async () => {
    const query = `*[_type == "post"] {
        _id,
        slug{
        current
      }
      }`;

      const posts = await sanityClient.fetch(query);
      const paths = posts.map((post: Post) => ({
          params: {
              slug: post.slug.current
          }
      }));

      return {
          paths,
          fallback: 'blocking',
      }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        slug{
        current
      },
        mainImage,
        title,
      body
      }`

    const post = await sanityClient.fetch(query, {
        slug: params?.slug
    })

    if (!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post
        },
        revalidate: 60
    }
}