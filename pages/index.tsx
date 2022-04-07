import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="md:mx-5">
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
      </div>
    </div>
  )
}

export default Home
