import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Blog() {
    return (
        <div className="max-w-7xl mx-auto h-full">
            <div className="md:mx-5 h-full" id="outer-container">
                <Head>
                <title>Sports Quiz - Blog</title>
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
                    <h1>blog</h1>
                </main>
                <Footer />
            </div>
        </div>
    )
}