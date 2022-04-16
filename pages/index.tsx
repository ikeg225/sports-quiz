import Head from 'next/head'
import Header from '../components/Header'
import PostGrid from '../components/PostGrid'
import { sanityClient } from '../sanity.js'
import { Post } from '../typings'
import Footer from '../components/Footer'
import { getData } from './api/mongo'
import SideBar from '../components/SideBar'
import AllPosts from '../components/AllPosts'

interface Props {
  posts: [Post];
  quizInfo: any;
}

export default function Home({ posts, quizInfo } : Props) {
  return (
    <div className="max-w-7xl mx-auto h-full">
      <div className="md:mx-5 h-full" id="outer-container">
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
          <div className="flex md:flex-row flex-col pt-16 m-5 md:m-0">
            <div className="md:w-7/12">
                <AllPosts posts={posts} quizInfo={quizInfo}/>
            </div>
            <div className="md:w-5/12">
                <SideBar posts={posts} title="Quizzes For You"/>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    id,
    title,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  const quizInfo = await getData()

  return {
    props: {
      posts,
      quizInfo
    },
  };
};
