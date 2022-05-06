import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Daily() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="md:mx-5">
                <Head>
                <title>Daily Question</title>
                <link rel="icon" href="/images/favicon.ico" />
                <link
                    rel="preload"
                    href="/fonts/Oswald-Bold.ttf"
                    as="font"
                    crossOrigin=""
                    />
                <meta name="title" key="title" content="Sports Quiz - Daily Question" />
                <meta name="description" key="description" content="Sports Quiz. The daily question page has a new sports related question every 24 hours! Come on in and test your knowledge!" />
                <meta property="og:url" content="sports-quiz.buunxexvvp-ez94dr0r96mr.p.runcloud.link/daily" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Sports Quiz - Daily Question" />
                <meta name="twitter:card" content="summary" />
                <meta property="og:description" content="Sports Quiz. The daily question page has a new sports related question every 24 hours! Come on in and test your knowledge!" />
                <meta property="og:image" content={"/images/Sports-Quiz-Preview.webp"} />
                </Head>
                <Header />
                <main>
                    <h1>Daily</h1>
                </main>
                <Footer />
            </div>
        </div>
    )
}