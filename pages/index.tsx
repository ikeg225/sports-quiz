import Head from 'next/head'
import Header from '../components/Header'
import PostGrid from '../components/PostGrid'
import { sanityClient } from '../sanity.js'
import { Post } from '../typings'

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
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
          <PostGrid posts={posts} />
        </main>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
