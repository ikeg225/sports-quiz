import Head from 'next/head'
import Header from '../components/Header'
import PostGrid from '../components/PostGrid'
import Footer from '../components/Footer'
import SideBar from '../components/SideBar'
import AllPosts from '../components/AllPosts'
import { Post } from '../typings'
import { getData } from './api/mongo'
import { sanityClient } from '../sanity.js'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

interface Props {
  posts: [Post];
  quizInfo: any;
}

export default function Home({ posts, quizInfo } : Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sort, setSort] = useState('plays')
  
  return (
    <div className="max-w-7xl mx-auto h-full">
      <div className="md:mx-5">
        <Head>
          <title>Sports Quiz</title>
          <link rel="icon" href="/images/favicon.ico" />
          <link
              rel="preload"
              href="/fonts/Oswald-Bold.ttf"
              as="font"
              crossOrigin=""
            />
            <meta name="title" key="title" content="Sports Quiz" />
            <meta name="description" key="description" content="Sports Quiz. Come on in and test your sports knowledge with our trivia quizzes or play fun and interactive personality quizzes!" />
            <meta property="og:url" content="sports-quiz.buunxexvvp-ez94dr0r96mr.p.runcloud.link/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Sports Quiz" />
            <meta name="twitter:card" content="summary" />
            <meta property="og:description" content="Sports Quiz. Come on in and test your sports knowledge with our trivia quizzes or play fun and interactive personality quizzes!" />
            <meta property="og:image" content={"/images/Sports-Quiz-Preview.webp"} />
        </Head>
        <Header />
        <main>
          <PostGrid posts={posts} />
          <div className="flex md:flex-row flex-col pt-16 m-5 md:m-0">
            <div className="md:w-7/12">
                <div className="flex justify-between pb-10">
                  <div className="xl:w-96">
                    <div className="flex flex-row">
                      <div className="inline-block px-6 py-2.5 bg-black rounded-l">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path fill="white" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                        </svg>
                      </div>
                      <input 
                        type="search" 
                        className="font-body form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-r transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Search" 
                        onChange={(evt) => { setSearchQuery(evt.target.value); }}
                      />
                    </div>
                  </div>
                  <div className="w-56 text-right">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-md font-body text-white bg-black rounded focus:outline-none">
                          Sort
                          <ChevronDownIcon
                            className="w-5 h-5 ml-2 -mr-1 text-white"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right font-body bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
                          <div className="px-1 py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button className={`${active ? 'bg-black text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`} >
                                  {active && setSort("plays")}
                                    Most Played
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button className={`${active ? 'bg-black text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`} >
                                  {active && setSort("created")}
                                    Newest
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button className={`${active ? 'bg-black text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`} >
                                  {active && setSort("avgScore")}
                                    Best Score
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button className={`${active ? 'bg-black text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`} >
                                  {active && setSort("numQuestions")}
                                    Number of Qs
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <AllPosts posts={posts} quizInfo={quizInfo} search={searchQuery} sort={sort}/>
            </div>
            <div className="md:w-5/12">
                <SideBar posts={posts} />
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
  publishedAt,
  quiztype,
    title,
    mainImage,
    slug,
    outbound
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
